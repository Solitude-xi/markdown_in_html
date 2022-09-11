markdowns = document.querySelectorAll('.markdown')

// markdown容器类
class Markdown {
  constructor(markdown) {
    this.markdown = markdown
    this.mark_str = '' // 内容字符串
    this.mark_list = [] // 内容数组，每一个元素就是一行
    this.init()
    this.create_node()
  }

  init() {
    this.init_mark_str()
    this.init_mark_list()
  }

  init_mark_str() {
    this.mark_str = this.markdown.innerHTML.trim()
  }

  init_mark_list() {
    this.mark_list = this.mark_str.split('\n')
    for (let i in this.mark_list) {
      this.mark_list[i] = this.mark_list[i].trim()
    }
  }

  create_node() {
    this.markdown.innerHTML = ''
    for (let row of this.mark_list) {
      let node = new Node(row)
      this.markdown.appendChild(node)
    }
  }
}

class Node {
  constructor(str) {
    this.str = str // 一个字符串
    this.tag = '' // 标签
    this.msg = '' // 信息
    this.url = '' // 如果是a标签则有url
    this.node = document.createElement('p') // node标签，默认为p标签
    this.init_tag_msg()
    return this.create_node() // 直接返回一个真实的html节点
  }

  // 初始化标签和信息
  init_tag_msg() {
    if (this.str[0] == '[') { // 链接
      let end_index = this.str.indexOf(']')
      this.tag = 'a'
      this.msg = this.str.slice(1, end_index)
      this.url = this.str.slice(end_index + 2, this.str.length - 1)
    } else if (this.str[0] == '!' && this.str[1] == '[') { // 图片
      let start_index = this.str.indexOf('(')
      this.tag = 'img'
      this.url = this.str.slice(start_index + 1, this.str.length - 1)
    } else { // 非链接
      let end_index = this.str.indexOf(' ') // 第一个空格的位置
      this.tag = this.str.slice(0, end_index) // 获取到标签名字
      this.msg = this.str.slice(end_index + 1) // 获取信息
    }
  }

  // 创建真实的html元素
  create_node() {
    let tag_name = 'p'  // 默认标签是p标签
    switch (this.tag) {
      case '#':
        tag_name = 'h1'
        break
      case '##':
        tag_name = 'h2'
        break
      case '###':
        tag_name = 'h3'
        break
      case '####':
        tag_name = 'h4'
        break
      case '#####':
        tag_name = 'h5'
        break
      case '######':
        tag_name = 'h6'
        break
      case 'a':
        tag_name = 'a'
        break
      case 'img':
        tag_name = 'img'
        console.log(this.url)
        break
    }

    this.node = document.createElement(tag_name) // 根据标签名称创建一个元素
    this.node.classList.add('md_in_ht_' + tag_name) // 添加一个类样式
    if (tag_name == 'a') {
      this.node.setAttribute('href', this.url)
    } else if (tag_name == 'img') {
      this.node.setAttribute('src', this.url)
    }
    this.node.innerHTML = this.msg
    return this.node
  }
}

for (markdown of markdowns) {
  new Markdown(markdown)
}