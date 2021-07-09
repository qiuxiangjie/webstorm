/*
 * @Descripttion: 
 * @author: zhoujianxiang
 * @Date: 2021-07-07 17:58:22
 * @LastEditors: zhoujianxiang
 * @LastEditTime: 2021-07-09 10:46:16
 * @Copyright: 2020 cheworld.com Inc. All rights reserved. 版权所有
 * 深圳市万普合信科技有限公司（91440300MA5FUB0P88） 注意：仅限于公司内部传阅，禁止外泄以及用于其他的商业目的
 */

function addEvent(){
        // 监听鼠标进入节点
        graph.on('node:mouseenter', (e) => {
          const nodeItem = e.item;
          // 设置目标节点的 hover 状态 为 true
          graph.setItemState(nodeItem, 'hover', true);
        });
        // 监听鼠标离开节点
        graph.on('node:mouseleave', (e) => {
          const nodeItem = e.item;
          // 设置目标节点的 hover 状态 false
          graph.setItemState(nodeItem, 'hover', false);
        });
        // 监听鼠标点击节点
        graph.on('node:click', (e) => {
          // 先将所有当前有 click 状态的节点的 click 状态置为 false
          const clickNodes = graph.findAllByState('node', 'click');
          clickNodes.forEach((cn) => {
            graph.setItemState(cn, 'click', false);
          });
          const nodeItem = e.item;
          // 设置目标节点的 click 状态 为 true
          graph.setItemState(nodeItem, 'click', true);
        });
        // 监听鼠标点击节点
        graph.on('edge:click', (e) => {
          // 先将所有当前有 click 状态的边的 click 状态置为 false
          const clickEdges = graph.findAllByState('edge', 'click');
          clickEdges.forEach((ce) => {
            graph.setItemState(ce, 'click', false);
          });
          const edgeItem = e.item;
          // 设置目标边的 click 状态 为 true
          graph.setItemState(edgeItem, 'click', true);
        });


        /////////////////////交互动画////////////////////////////////

        // 监听节点的 mouseenter 事件
          graph.on('node:mouseenter', (ev) => {
            // 获得当前鼠标操作的目标节点
            const node = ev.item;
            // 获得目标节点的所有相关边
            const edges = node.getEdges();
            // 将所有相关边的 running 状态置为 true，此时将会触发自定义节点的 setState 函数
            edges.forEach((edge) => graph.setItemState(edge, 'running', true));
          });

          // 监听节点的 mouseleave 事件
          graph.on('node:mouseleave', (ev) => {
            // 获得当前鼠标操作的目标节点
            const node = ev.item;
            // 获得目标节点的所有相关边
            const edges = node.getEdges();
            // 将所有相关边的 running 状态置为 false，此时将会触发自定义节点的 setState 函数
            edges.forEach((edge) => graph.setItemState(edge, 'running', false));
          });

}
