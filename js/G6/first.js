/*
 * @Descripttion: 
 * @author: zhoujianxiang
 * @Date: 2021-06-18 15:08:51
 * @LastEditors: zhoujianxiang
 * @LastEditTime: 2021-06-18 15:30:15
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
      target: "node2"
    }
  ]
};

const graph = new G6.Graph({
  container: "container",
  width: 1000,
  height: 500,
  defaultNode: {
    shape: "ellipse",
    //type: 'rect',
    size: [100],
    color: "#5B8FF9",
    style: {
      fill: "red",
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
      stroke: "red"
    }
  }
});

graph.data(data);
graph.render();