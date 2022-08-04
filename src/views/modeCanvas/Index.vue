<template>
  <div class="container-canvas">
    <span>Canvas</span>
    <div class="canvas">
     <table>

     </table>
      <div class="box-mover" id="box-mover" v-if="false"></div>
    </div>
    <div>
      <span>componentes</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { v4 as uuidv4 } from "uuid";

interface GRIDSCHEDULE {
  x: number;
  y: number;
  content: any;
}

@Options({
  data() {
    return {
      rows: 5,
      colun: 7,
      render: 400,
      renderWidth: 800,
      renderheight: 600,
      renderCelulaWidth: 120,
      renderCelulaheight: 42,
      gridSchedule: [
        // { x: 0, y: 0, content: "" },
        // { x: 100, y: 0, content: "" },
        // { x: 200, y: 0, content: "" },
        // { x: 300, y: 0, content: "" },
      ],
      marginCanvas: 20,
      position: { x: 0, y: 0 },
    };
  },
  created() {
    this.renderWidth = this.colun * this.renderCelulaWidth + 40;
    this.renderheight = 700;
  },
  mounted() {
    let lastX = this.marginCanvas;
    let lastY = this.marginCanvas;

    // eslint-disable-next-line no-plusplus
    for (let y = 0; y < this.rows; y++) {
      (this.gridSchedule as GRIDSCHEDULE[]).push({
        x: lastX,
        y: lastY,
        content: { id: uuidv4() },
      });

      // eslint-disable-next-line no-plusplus
      for (let x = 1; x < this.colun; x++) {
        lastX = this.renderCelulaWidth + lastX;
        (this.gridSchedule as GRIDSCHEDULE[]).push({
          x: lastX,
          y: lastY,
          content: { id: uuidv4() },
        });
      }

      lastY = this.renderCelulaheight + lastY;
      lastX = this.marginCanvas;
    }

    console.log(this.gridSchedule);
    this.renderCanvas();
  },
  methods: {
    moveCanvas(event: MouseEvent) {
      // eslint-disable-next-line object-curly-newline
      const { offsetX, offsetY } = event;
      this.position = { x: offsetX, y: offsetY };
      //   item.x >= offsetX &&
      //   item.x + this.renderCelulaWidth <= offsetX &&

      const existCelula = (this.gridSchedule as GRIDSCHEDULE[]).filter(
        (item) => {
          const { x, y } = item;
          // if (left <= x && right >= x && top <= y && bottom >= y) {
          const top = y - this.marginCanvas / 2;
          const bottom = y + this.renderCelulaheight;
          const right = x + (this.renderCelulaWidth - this.marginCanvas);
          const left = x - this.marginCanvas / 2;

          let exist = false;
          if (
            left <= offsetX &&
            right >= offsetX &&
            top <= offsetY &&
            bottom >= offsetY
          ) {
            exist = true;
          }
          return exist;
        },
      );

      // item.y >= offsetY &&
      //   item.y + this.renderCelulaheight <= offsetY
      // console.log(
      // (item.y >= offsetY && item.y + this.renderCelulaheight <= offsetY),
      //   offsetX + (this.renderWidth - 880),
      //   offsetY + (this.renderheight - 700),
      // );
      if (existCelula.length > 0) {
        const canvas = document.querySelector("canvas");

        if (!canvas) {
          return;
        }

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return;
        }
        ctx.beginPath();
        ctx.rect(
          existCelula[0].x,
          existCelula[0].y,
          this.renderCelulaWidth,
          this.renderCelulaheight,
        );
        ctx.strokeStyle = "red";
        ctx.stroke();

        // console.log(existCelula[0], offsetX, offsetY);

        // rect.rect(
        //   existCelula[0].x,
        //   existCelula[0].y,
        //   this.renderCelulaWidth,
        //   this.renderCelulaheight
        // );
      }
    },
    enterCanvas(event: MouseEvent) {
      console.log(event);
    },
    upCanvas(event: MouseEvent) {
      console.log(event);
    },
    downCanvas(event: MouseEvent) {
      console.log(event);
    },
    selectCanvas(event: MouseEvent) {
      console.log(event);
    },
    renderCanvas() {
      const renderGrid = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return;
        }
        ctx.beginPath();

        const color = [
          "maroon",
          "red",
          "purple",
          "fuchsia",
          "green",
          "lime",
          "olive",
          "yellow",
          "navy",
          "blue",
          "teal",
          "aqua",
          "chocolate",
          "darkgreen",
        ];
        //   rows: 5,
        // colun: 7,

        (this.gridSchedule as GRIDSCHEDULE[]).forEach(
          (celula: GRIDSCHEDULE, idx: number) => {
            ctx.rect(
              celula.x,
              celula.y,
              this.renderCelulaWidth,
              this.renderCelulaheight,
            );
            ctx.strokeStyle = color[idx];
            ctx.stroke();
          },
        );

        ctx.stroke();
      };
      const canvas = document.querySelector("canvas");

      if (!canvas) {
        return;
      }

      renderGrid(canvas);
    },
    createItem() {
      console.log("create item");
    },
  },
})
export default class Menu extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container-canvas {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.canvas-render {
  background-color: #eee;
  margin: 10px;
  width: 800px;
  height: 700px;
}

.canvas {
  display: flex;
  position: relative;
}

.box-mover {
  width: 100px;
  height: 100px;
  background-color: rgb(19, 133, 105);
  position: absolute;
  pointer-events: none;
}
</style>
