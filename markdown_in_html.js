markdowns = document.querySelectorAll('.markdown')

// markdown容器
class MarkdownVessel {
  constructor(markdown) {
    this.markdown = markdown // dom元素
    this.contentStr = '' // 内容字符串
    this.contentList = [] // 内容数组
    this.init()
  }
  init() {
    this.initContentStr()
    this.initContentList()
    // let img = new Img('./001.jpg', '测试图片')
    // this.markdown.appendChild(img)
    this.markdown2HTML()
  }
  initContentStr() {
    this.contentStr = this.markdown.innerHTML.trim()
    // this.contentStr = this.markdown.innerText.trim()
  }
  initContentList() {
    this.contentList = this.contentStr.split('\n')
    for (let i in this.contentList) {
      this.contentList[i] = this.contentList[i].trim()
    }
  }
  markdown2HTML() {
    this.markdown.innerHTML = ''
    for (let row of this.contentList) {
      let node = new NodeFactory(row)
      // console.log(node)
      this.markdown.appendChild(node)
    }
  }
}


// Node结点生成工厂
class NodeFactory {
  constructor(origStr) {
    // 原始字符串
    this.origStr = origStr
    // 块元素标签名（只一个）
    this.blockNodeTag = ''
    return this.init()
  }
  init() {
    this.initBlickNodeTag()
    // console.log('类型是', this.blockNodeTag)
    // this.addStyle('00**你好**555')
    return this.createNode()
  }
  initBlickNodeTag() {
    let endIndex = this.origStr.indexOf(' ')
    if (endIndex != -1) {
      let tag = this.origStr.slice(0, endIndex) + ''
      console.log('index位置', endIndex, tag)
      switch (tag) {
        case '#':
          this.blockNodeTag = 'h1'
          break
        case '##':
          this.blockNodeTag = 'h2'
          break
        case '###':
          this.blockNodeTag = 'h3'
          break
        case '####':
          this.blockNodeTag = 'h4'
          break
        case '#####':
          this.blockNodeTag = 'h5'
          break
        case '######':
          this.blockNodeTag = 'h6'
          break
        case '&gt;': // >
          this.blockNodeTag = 'blockquote'
          console.log('引用块')
          break
        default:
          this.blockNodeTag = 'p'
      }
    } else {
      // 判断是不是hr
      let regHr1 = new RegExp(/^---$/)
      let regHr2 = new RegExp(/^\*\*\*$/)
      let regHr3 = new RegExp(/^___$/)
      // 判断是否是图片
      let regImg = new RegExp(/^!\[.*\]\(.*\)$/)
      switch (true) {
        case regHr1.test(this.origStr):
        case regHr2.test(this.origStr):
        case regHr3.test(this.origStr):
          this.blockNodeTag = 'hr'
          break
        case regImg.test(this.origStr):
          this.blockNodeTag = 'img'
          break
        default:
          this.blockNodeTag = 'p'
      }
    }
  }

  // 传字符串然后判断是否有加粗，斜体，链接，有则替换
  addStyle(str) {
    let regStrong1 = new RegExp(/\*{2}[^\*]*\*{2}[^\*]*/)
    let regStrong2 = new RegExp(/_{2}[^_]*_{2}[^_]*/)
    let regEm1 = new RegExp(/\*[^\*]*\*[^\*]*/)
    let regEm2 = new RegExp(/_[^\*]*_[^\*]*/)
    let regA = new RegExp(/\.*\]\(.*\)/)
    let node = null

    // 里面有样式的话就循环渲染
    // while (regStrong1.test(str) || regStrong2.test(str) || regEm1.test(str) || regEm2.test(str) || regA.test(str)) {
    let startIndex, endIndex, content
    switch (true) {
      // 是否加粗
      case regStrong1.test(str):
        startIndex = str.indexOf('**') + 2
        endIndex = str.indexOf('**', startIndex)
        content = str.slice(startIndex, endIndex)
        // str = str.slice(0, startIndex - 2) + JSON.stringify(new Strong(content)) + str.slice(endIndex + 2)
        console.log('添加样式之后', new Strong(content))
        break
      case regStrong2.test(str):
        startIndex = str.indexOf('__') + 2
        endIndex = str.indexOf('__', startIndex)
        content = str.slice(startIndex, endIndex)
        console.log('开始的地方在', startIndex, endIndex, content)
        break
        // 是否斜体
      case regEm1.test(str):
        startIndex = str.indexOf('*') + 1
        endIndex = str.indexOf('*', startIndex)
        content = str.slice(startIndex, endIndex)
        console.log('开始的地方在', startIndex, endIndex, content)
        break
      case regEm1.test(str):
        startIndex = str.indexOf('_') + 1
        endIndex = str.indexOf('_', startIndex)
        content = str.slice(startIndex, endIndex)
        console.log('开始的地方在', startIndex, endIndex, content)
        break
        // 是否是超链接
      case regA.test(str):
        break
    }
    // }
  }

  // createStyle()

  createNode() {
    let node = null
    let startIndex
    let content
    switch (this.blockNodeTag) {
      case 'h1':
        startIndex = this.origStr.indexOf(' ') + 1
        content = this.origStr.slice(startIndex)
        node = new H1(content)
        break
      case 'h2':
        startIndex = this.origStr.indexOf(' ') + 1
        content = this.origStr.slice(startIndex)
        node = new H2(content)
        break
      case 'h3':
        startIndex = this.origStr.indexOf(' ') + 1
        content = this.origStr.slice(startIndex)
        node = new H3(content)
        break
      case 'h4':
        startIndex = this.origStr.indexOf(' ') + 1
        content = this.origStr.slice(startIndex)
        node = new H4(content)
        break
      case 'h5':
        startIndex = this.origStr.indexOf(' ') + 1
        content = this.origStr.slice(startIndex)
        node = new H5(content)
        break
      case 'h6':
        startIndex = this.origStr.indexOf(' ') + 1
        content = this.origStr.slice(startIndex)
        node = new H6(content)
        break
      case 'blockquote':
        startIndex = this.origStr.indexOf(' ') + 1
        content = this.origStr.slice(startIndex)
        node = new Blockquote(content)
        break
      case 'p':
        node = new P(this.origStr)
        break
      case 'hr':
        node = new Hr()
        break
      case 'img':
        startIndex = this.origStr.indexOf('[') + 1
        let endIndex = this.origStr.indexOf(']')
        let alt = this.origStr.slice(startIndex, endIndex)
        
        startIndex = this.origStr.indexOf('(') + 1
        endIndex = this.origStr.indexOf(')')
        let src = this.origStr.slice(startIndex, endIndex)
        
        node = new Img(src, alt)
        break
    }
    console.log(node)
    return node
  }
}


// 结点顶级超类
class Node {
  constructor(tagName) {
    this.tagName = tagName // 标签名称
    this.className = 'md_in_ht_' + tagName // 特定class类名
  }
  // 创建一个DOM元素
  createNode() {}
}

// 块元素超类
class BlockNode extends Node {
  constructor(tagName) {
    super(tagName)
  }
}

// 行内元素超类
class SpanNode extends Node {
  constructor(tagName) {
    super(tagName, )
  }
}

// 标题超类
class Heading extends BlockNode {
  constructor(tagName, content) {
    super(tagName)
    this.content = content
    return this.createNode()
  }
  createNode() {
    let node = document.createElement(this.tagName) // 创建dom元素
    node.innerHTML = this.content
    node.classList.add(this.className)
    return node
  }
}

class H1 extends Heading {
  constructor(content) {
    super('h1', content)
  }
}

class H2 extends Heading {
  constructor(content) {
    super('h2', content)
  }
}

class H3 extends Heading {
  constructor(content) {
    super('h3', content)
  }
}

class H4 extends Heading {
  constructor(content) {
    super('h4', content)
  }
}

class H5 extends Heading {
  constructor(content) {
    super('h5', content)
  }
}

class H6 extends Heading {
  constructor(content) {
    super('h6', content)
  }
}

class P extends BlockNode {
  constructor(content) {
    super('p')
    this.content = content
    return this.createNode()
  }
  createNode() {
    let node = document.createElement(this.tagName)
    node.innerHTML = this.content
    node.classList.add(this.className)
    return node
  }
}

class Hr extends BlockNode {
  constructor() {
    super('hr')
    return this.createNode()
  }
  createNode() {
    let node = document.createElement(this.tagName)
    node.classList.add(this.className)
    return node
  }
}

class Img extends BlockNode {
  constructor(src, alt) {
    super('img')
    this.src = src
    this.alt = alt
    return this.createNode()
  }
  createNode() {
    let node = document.createElement(this.tagName)
    node.setAttribute('src', this.src)
    node.setAttribute('alt', this.alt)
    node.classList.add(this.className)
    return node
  }
}

class Blockquote extends BlockNode {
  constructor(content) {
    super('blockquote')
    this.content = content
    return this.createNode()
  }
  createNode() {
    let node = document.createElement(this.tagName)
    node.classList.add(this.className)
    node.innerHTML = this.content
    return node
  }
}

class Strong extends SpanNode {
  constructor(content) {
    super('strong')
    this.content = content
    return this.createNode()
  }
  createNode() {
    let node = document.createElement(this.tagName)
    node.classList.add(this.className)
    node.innerHTML = this.content
    return node
  }
}

class Em extends SpanNode {
  constructor(content) {
    super('em')
    this.content = content
    return this.createNode()
  }
  createNode() {
    let node = document.createElement(this.tagName)
    node.classList.add(this.className)
    node.innerHTML = this.content
    return node
  }
}

class A extends SpanNode {
  constructor(href, content) {
    super('a')
    this.href = href
    this.content = content
    return this.createNode()
  }
  createNode() {
    let node = document.createElement(this.tagName)
    node.classList.add(this.className)
    node.setAttribute('href', this.href)
    node.innerHTML = this.content
    return node
  }
}


// 渲染所有的mardown元素
for (let markdown of markdowns) {
  let md = new MarkdownVessel(markdown)
  console.log(md)
}