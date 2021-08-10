#### 1、树的基本性质
节点的度： 节点包含的子树<br>
叶子结点或终端结点： 度为0的结点<br>
二叉树是一种非线形数据结构，但顺序存储结构和链式存储结构都可以存储<br>
#### 2、满二叉树
每一个非叶子结点都存在左右子树，并且所有的叶子结点在统一层级<br>
#### 3、完全二叉树
将完全二叉树结点，按从左到右的顺序编号，编号与满二叉树中同一位置的结点，编号相同<br>
#### 4、平衡二叉树
可能为空树<br>
任何结点的高度相差不超过1<br>
#### 5、B-树
B-树主要用于文件系统，以及部分数据库索引；以二叉树作为索引，查找情况最差为树的高度，减小树的高度是提高索引效率的关键<br>
#### 6、B+树
B+树的改进之处，中间结点不在包含卫星数据，每个磁盘页可以包含更多的结点，树的高度变矮了，查询效率更高<br>
#### 7、红黑树
红黑树保证从根结点到叶子结点最长路径不超过最短路径的两倍（<strong>待研究</strong>）
#### 8、Huffman树
基于二叉树构建编码压缩结构；算法根据文本出现的频率，重新对字符进行编码，出现频率越高的词，编码越短<br>
#### 9、实现树结点类
    class Node {
      constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
      }
      show() {
        console.log(this.value)
      }
    }
#### 10、二叉查找树类
    class BinarySearchTree {
      constructor(){
        this.root = null
      }
    }
#### 11、二叉查找树，树的结点插入方法
    insert(value) {
      let newNode = new Node(value)
      if (this.root === null) {
        this.root = newNode
      } else {
        this.insertNode(this.root, newNode)
      }
    }
    insertNode(node, newNode) {
      if (node.value > newNode.value) {
        if (node.left === null) {
          node.left = newNode
        } else {
          this.insertNode(node.left, newNode)
        }
      }
      if (node.value < newNode.value){
        if (node.right === null) {
          node.right = newNode
        } else {
          this.insertNode(node.right, newNode)
        }
      }
    }
#### 12、通过递归实现先序、中序、后序遍历
    // 先序遍历，先打印当前结点，再打印左子结点，再答应右子结点
    preOrderTravel() {
      this.preOrderTravelNode(this.root)
    }
    
    preOrderTravelNode(node) {
      if (node !== null) {
        node.show()
        this.preOrderTravelNode(node.left)
        this.preOrderTravelNode(node.right)
      }
    }
    // 中序遍历，先打印左子结点，再打印当前结点，最后打印右子结点
    inOrderTravel() {
      this.inOrderTravelNode(this.root)
    }
    inOrderTravelNode(node) {
      if (node !== null) {
        this.inOrderTravelNode(node.left)
        node.show()
        this.inOrderTravelNode(node.right)
      }
    }
    // 后序遍历，先打印右子结点，再打印当前结点，最后打印左子结点
    postOrderTravel() {
      this.postOrderTravelNode(this.root)
    }
    postOrderTravelNode(node) {
      this.postOrderTravelNode(node.right)
      node.show()
      this.postOrderTravelNode(node.left)
    }
#### 13、通过循环，实现先序，中序，后序遍历
    // 先序遍历
    // 首先根结点入栈，然后进入循环，每次循环，当前结点出栈，打印当前结点
    // 然后将右结点入栈，左结点入栈，然后进入下一次循环，直到栈为空，循环结束
    preOrderTravelStack() {
      let stack = []
      stack.push(this.root)
      while(stack.length > 0) {
        let node = stack.pop()
        node.show()
        if (node.right) {
          stack.push(node.right)
        }
        if (node.left) {
          stack.pusj(node.left)
        }
      }
    }
    // 中序遍历
    // 中序遍历将所有的左子结点入栈，如果左子结点为null，则打印栈顶元素，然后判断该元素是否有
    // 右子结点，如果有，则将右子树作为起点重复上述过程，直到栈为空结点为空时
    inOrderTravelStack() {
      let stack = [],
          ndoe = this.root
      while (stack.length > 0 || node) {
        if (node) {
          stack.push(node)
          node = node.left
        } else {
          node = stack.pop()
          node.show()
          node = node.right
        }
      }
    }
    // 后序遍历
    // 使用两个栈来实现，先将根结点放入栈1中，然后进入循环，每次循环将栈顶元素加入栈2，
    // 再一次将左子结点和右子结点加入栈1中，然后进入下一循环中，直到栈1的长度为0，再
    // 循环打印栈2
    postOrderTravelStack() {
       let stack1 = [],
           stack2 = [],
           node = null;
       stack.push(this.root)
       while(stack1.length > 0) {
        node = stack1.pop();
        stack2.push(node)
        if (node.left) {
          stack1.push(node.left)
        }
        if (node.right) {
          stack1.push(node.right)
        }
       }
       while(stack2.length > 0) {
        let node == stack2.pop()
        node.show()
       }
    }
#### 14、寻找最大值和最小值
    // 寻找最小值，再最左边的叶子结点上
    findMinNode(root) {
      let node = root
      while (node && node.left) {
        node = node.left
      }
      
      return node
    }
    findMaxNode(root) {
      let node = root
      while( node && node.right) {
        node = node.right
      }
      return node
    }
#### 15、寻找特定值的结点
    // 寻找特定值
    find(value) {
      return this.findNode(this.root, value)
    }
    findNode(node, value) {
      if (node === null) {
        return node
      }
      if (value < node.value) {
        return this.findNode(node.left, value)
      } else (value > node.value) {
        return this.findNode(node.right, value)
      } else {
        return node
      }
    }
#### 16、移除结点值
    // 找到需要移除的结点，判断该结点是否有子结点，如果没有，则直接删除
    // 如果有一个叶子结点，则用该结点替换当前位置，如果有两个子结点，则用右子树中最小的结点替换当前结点
    
