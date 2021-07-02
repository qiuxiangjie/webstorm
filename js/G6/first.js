/*
 * @Descripttion: 
 * @author: zhoujianxiang
 * @Date: 2021-06-18 15:08:51
 * @LastEditors: zhoujianxiang
 * @LastEditTime: 2021-07-02 17:16:27
 * @Copyright: 2020 cheworld.com Inc. All rights reserved. 版权所有
 * 深圳市万普合信科技有限公司（91440300MA5FUB0P88） 注意：仅限于公司内部传阅，禁止外泄以及用于其他的商业目的
 */
const data = {
  nodes: [
    {
      id: "node1",
      label: "北京",
      x: 150,
      y: 150
    },
    {
      id: "node2",
      label: "上海",
      x: 400,
      y: 150
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
      label: '我是连线', // 边的文本
    }
  ]
};

const graph = new G6.Graph({
  container: "container",
  width: 1000,
  height: 1000,
  fitView: true, // 图表自适应画布大小
  fitViewPadding: [20, 40, 50, 20], 
  animate: true,
  modes: {
    // 支持的 behavior
    default: ['drag-canvas', 'zoom-canvas','click-select'],
    edit: ['click-select'],
  },
  nodeStateStyles:{
    hover:{
      style: {
        fill: "yellow",
        lineWidth: 3
      },
    },
    click: {
      labelCfg: {
        style: {
          fill: "#333",
          fontSize: 20
        }
      }
    }
  },
  defaultNode: {
    shape: "ellipse",
    //type: 'rect',
    size: [100],
    color: "#5B8FF9",
    style: {
      fill: "#ccc",
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: "#fff",
        fontSize: 20
      }
    }
  },
  defaultEdge: {
    style: {
      stroke: "#000",
      opacity: 0.2
    }
  }
});

const main = async () => {
  // const response = await fetch(
  //   'http://127.0.0.1:8081/data.json',
  // );
  const remoteData = dataJson;

  // ...
  console.log(remoteData)
  setNodeStyle(remoteData)
  graph.data(remoteData); // 加载远程数据
  graph.render(); // 渲染
};

function setNodeStyle(data){
  const nodes = data.nodes;
  nodes.forEach((node) => {
    if (!node.style) {
      node.style = {};
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

main()