////////////////////////插件//////////////////
// 实例化 minimap 插件
const minimap = new G6.Minimap({
  size: [100, 100],
  className: 'minimap',
  type: 'delegate',
});
// 实例化 grid 插件
const grid = new G6.Grid();

// 实例化 toolbar 插件
const toolbar = new G6.ToolBar();

// 实例化 fisheye 插件
const fisheye = new G6.Fisheye({
  trigger: 'mousemove',
  d: 3,
  r: 200,
 // delegateStyle: { stroke: '#000', strokeOpacity: 0.2, lineWidth: 2, fillOpacity: 0.1, fill: '#ccc' },
  showLabel: false
});




//////////////////////图表配置/////////////////////////


// 实例化图
const graph = new G6.Graph({
  plugins: [minimap,grid,], // 将 minimap 实例配置到图上
  container: "container",
  width: 1000,
  height: 1000,
 // fitView: true, // 图表自适应画布大小
  //fitViewPadding: [20, 40, 50, 20], // 配合fitView用
 animate: true,
  // layout: {
  //   // Object，可选，布局的方法及其配置项，默认为 random 布局。
  //   type: layouts[2], // 指定为力导向布局
  //   preventOverlap: true, // 防止节点重叠
  //   // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
  //   linkDistance: 200, // 指定边距离为100
  // },
  layout: {
    type: 'force',
    linkDistance: 100,
    preventOverlap: true,
    nodeStrength: -30,
    edgeStrength: 0.1
  },
 // fitCenter: true,
  modes: {
    // 支持的 behavior
    default: [ 
      'zoom-canvas',
      'click-select',
      'activate-relations',
      'brush-select',
      // {
      //   type: 'collapse-expand', // 只试用树形
      //   onChange: function onChange(item, collapsed) {
      //     const data = item.get('model');
      //     data.collapsed = collapsed;
      //     return true;
      //   },
      // },
      {
      type: 'drag-node',
      shouldEnd: (e)=>{
        return true
      },
    },
    {
      type: 'tooltip',
      formatText(model) {
        return `<div style='color:red'>${model.label}</div>`;
      },
      offset: 10,
    },
    // {
    //   type: 'edge-tooltip', // 边提示框
    //   formatText(model) {
    //     // 边提示框文本内容
    //     const text =
    //       'source: ' +
    //       model.source +
    //       '<br/> target: ' +
    //       model.target +
    //       '<br/> weight: ' +
    //       model.weight;
    //     return text;
    //   },
    // },
  ],
    edit: ['click-select'],
  },
  nodeStateStyles:{
    hover:{
      fill: "lightsteelblue",
      lineWidth: 3
    },
    click: {
      stroke: 'red',
      lineWidth: 5,
    }
  },
  edgeStateStyles:{
    hover:{
      fill: "yellow",
      lineWidth: 3
    },
    click: {
      stroke: 'red',
      lineWidth: 5,
    },


  },
  defaultNode: {
    type: "ellipse",
    //type: 'rect',
    size: [30],
    color: "#5B8FF9",
    style: {
      fill: "#333",
      lineWidth: 3
    },
    labelCfg: {
      position: 'bottom',
      autoRotate: true, // 边上的标签文本根据边的方向旋转
      style: {
        fill: "blur",
        fontSize: 20
      }
    }
  },
  defaultEdge: {
    type:'quadratic',
    style: {
     // endArrow: true,
      endArrow: {
        path: 'M 0,0 L 8,4 L 8,-4 Z',
        fill: '#e2e2e2',
        },
      // stroke: "#000",
      // opacity: 0.2
    },
      labelCfg: {
    //  position: 'middle',
      autoRotate: true, // 边上的标签文本根据边的方向旋转
      style: {
        stroke: '#fff',
        lineWidth:2,
        fontSize: 14
      }
    }
  }
});

const main = async () => {
  // const response = await fetch(
  //   'http://127.0.0.1:8081/data.json',
  // );
  const remoteData = dataJson;
  //const remoteData = demoData;


 // setNodeStyle(remoteData) // 根据节点数据设置节点样式
 // setEdgeStyle(remoteData) // 根据节点数据设置边样式
  graph.data(remoteData); // 加载远程数据
  graph.render(); // 渲染
  addEvent()
};

function setNodeStyle(data){
  const nodes = data.nodes;
  nodes.forEach((node) => {
    if (!node.style) {
      node.style = {fill: "#333",};
    }
    switch (
      node.class // 根据节点数据中的 class 属性配置图形
    ) {
      case 'c0': {
        node.type = 'circle'; // class = 'c0' 时节点图形为 circle
        break;
      }
      case 'c1': {
        node.type = 'rect'; // class = 'c1' 时节点图形为 rect
        node.size = [35, 20]; // class = 'c1' 时节点大小
        break;
      }
      case 'c2': {
        node.type = 'ellipse'; // class = 'c2' 时节点图形为 ellipse
        node.size = [35, 20]; // class = 'c2' 时节点大小
        break;
      }
    }
  });
  return data;
}

function setEdgeStyle(data){
  const edges = data.edges;
  edges.forEach((edge) => {
    if (!edge.style) {
      edge.style = {};
    }
    edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
    edge.style.opacity = 0.6;
    edge.style.stroke = 'grey';
  });
  
}

main()
var i=3
document.getElementById('update').onclick = () => {
  // arr = [dataJson, dataJson2, dataJson3]
  // graph.changeData(arr[Math.ceil(Math.random()*3)])
  dataJson2.nodes = [...dataJson2.nodes,
    {
      id: 'node' + i,
      label: 'node' + i,
    },
  ]
  dataJson2.edges = [...dataJson2.edges,{
    source: 'node1',
    target: 'node' + i,
  },]
  i++;
  graph.changeData(dataJson2)



}