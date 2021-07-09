/*
 * @Descripttion: 
 * @author: zhoujianxiang
 * @Date: 2021-07-09 09:01:26
 * @LastEditors: zhoujianxiang
 * @LastEditTime: 2021-07-09 10:43:53
 * @Copyright: 2020 cheworld.com Inc. All rights reserved. 版权所有
 * 深圳市万普合信科技有限公司（91440300MA5FUB0P88） 注意：仅限于公司内部传阅，禁止外泄以及用于其他的商业目的
 */
const Util = G6.Util;
// Scale Animation
console.log(123123)
G6.registerNode(
  'circle-animate',
  {
    afterDraw(cfg, group) {
      console.log(123123)
      const shape = group.get('children')[0];
      shape.animate(
        (ratio) => {
          const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
          return {
            r: cfg.size / 2 + diff,
          };
        },
        {
          repeat: true,
          duration: 3000,
          easing: 'easeCubic',
        },
      );
    },
  },
  'circle',
);


// Background Animation
G6.registerNode(
  'background-animate',
  {
    afterDraw(cfg, group) {
      const r = cfg.size / 2;
      const back1 = group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6,
        },
        name: 'back1-shape',
      });
      const back2 = group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6,
        },
        name: 'back2-shape',
      });
      const back3 = group.addShape('circle', {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6,
        },
        name: 'back3-shape',
      });
      group.sort(); // Sort according to the zIndex
      back1.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1,
        },
        {
          duration: 3000,
          easing: 'easeCubic',
          delay: 0,
          repeat: true, // repeat
        },
      ); // no delay
      back2.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1,
        },
        {
          duration: 3000,
          easing: 'easeCubic',
          delay: 1000,
          repeat: true, // repeat
        },
      ); // 1s delay
      back3.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1,
        },
        {
          duration: 3000,
          easing: 'easeCubic',
          delay: 2000,
          repeat: true, // repeat
        },
      ); // 3s delay
    },
  },
  'circle',
);

// Image animation
G6.registerNode(
  'inner-animate',
  {
    afterDraw(cfg, group) {
      const size = cfg.size;
      const width = size[0] - 12;
      const height = size[1] - 12;
      const image = group.addShape('image', {
        attrs: {
          x: -width / 2,
          y: -height / 2,
          width,
          height,
          img: cfg.img,
        },
        name: 'image-shape',
      });
      image.animate(
        (ratio) => {
          const toMatrix = Util.transform(
            [1, 0, 0, 0, 1, 0, 0, 0, 1],
            [['r', ratio * Math.PI * 2]],
          );
          return {
            matrix: toMatrix,
          };
        },
        {
          repeat: true,
          duration: 3000,
          easing: 'easeCubic',
        },
      );
    },
  },
  'rect',
);


////////////////////////////////边动画///////////////////////////////////////

G6.registerEdge(
  'circle-running',
  {
    afterDraw(cfg, group) {
      // get the first shape in the group, it is the edge's path here=
      const shape = group.get('children')[0];
      // the start position of the edge's path
      const startPoint = shape.getPoint(0);

      // add red circle shape
      const circle = group.addShape('circle', {
        attrs: {
          x: startPoint.x,
          y: startPoint.y,
          fill: '#1890ff',
          r: 3,
        },
        name: 'circle-shape',
      });

      // animation for the red circle
      circle.animate(
        (ratio) => {
          // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
          // get the position on the edge according to the ratio
          const tmpPoint = shape.getPoint(ratio);
          // returns the modified configurations here, x and y here
          return {
            x: tmpPoint.x,
            y: tmpPoint.y,
          };
        },
        {
          repeat: true, // Whether executes the animation repeatly
          duration: 3000, // the duration for executing once
        },
      );
    },
  },
  'cubic', // extend the built-in edge 'cubic'
);



// lineDash 的差值，可以在后面提供 util 方法自动计算
const lineDash = [4, 2, 1, 2];
G6.registerEdge(
  'line-dash',
  {
    afterDraw(cfg, group) {
      // 获得该边的第一个图形，这里是边的 path
      const shape = group.get('children')[0];
      let index = 0;
      // 边 path 图形的动画
      shape.animate(
        () => {
          index++;
          if (index > 9) {
            index = 0;
          }
          const res = {
            lineDash,
            lineDashOffset: -index,
          };
          // 返回需要修改的参数集，这里修改了 lineDash,lineDashOffset
          return res;
        },
        {
          repeat: true, // 动画重复
          duration: 3000, // 一次动画的时长为 3000
        },
      );
    },
  },
  'cubic',
); // 该自定义边继承了内置三阶贝塞尔曲线边 cubic





////////////////////////////////交互动画//////////////////////////////////

//const lineDash = [4, 2, 1, 2];

// 注册名为 'can-running' 的边
G6.registerEdge(
  'can-running',
  {
    // 复写setState方法
    setState(name, value, item) {
      const shape = item.get('keyShape');
      // 监听 running 状态
      if (name === 'running') {
        // running 状态为 true 时
        if (value) {
          let index = 0; // 边 path 图形的动画
          shape.animate(
            () => {
              index++;
              if (index > 9) {
                index = 0;
              }
              const res = {
                lineDash,
                lineDashOffset: -index,
              };
              // 返回需要修改的参数集，这里修改了 lineDash,lineDashOffset
              return res;
            },
            {
              repeat: true, // 动画重复
              duration: 3000, // 一次动画的时长为 3000
            },
          );
        } else {
          // running 状态为 false 时
          // 结束动画
          shape.stopAnimate();
          // 清空 lineDash
          shape.attr('lineDash', null);
        }
      }
    },
  },
  'cubic-horizontal',
); // 该自定义边继承了内置横向三阶贝塞尔曲线边 cubic-horizontal