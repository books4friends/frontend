<template>
    <div class="holder">
        <div class="change-background" @click="changeBackgroundHandler">o</div>
        <canvas ref="generator-canvas"></canvas>
    </div>
</template>

<script>
    import { hlsToHex } from '../../utils/colors'
    import { divideTextToLines } from '../../utils/stringUtils'

    const HEIGHT = 199;
    const WIDTH = 128;

    export default {
        name: "ImageGenerator.vue",
        props: {
            title: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            }
        },
        data: () => {
            return {
                ctx: undefined,
                gradient: undefined,
                blob: undefined,
            }
        },
        watch: {
            title: function () {
                this.draw()
            },
            author: function () {
                this.draw()
            }
        },
        methods: {
            getRandomArbitrary: function(min, max){
                return Math.random() * (max - min) + min;
            },
            getRandomHsl: function(){
                return [
                    this.getRandomArbitrary(0, 1),
                    this.getRandomArbitrary(0.5, 1),
                    this.getRandomArbitrary(0.15, 0.35)
                ]
            },
            draw: function () {
                this.ctx.fillStyle = this.gradient;
                this.ctx.fillRect(0,0, WIDTH, HEIGHT);
                this.ctx.fill();


                this.ctx.textAlign = 'center';
                this.ctx.fillStyle = 'white';

                this.ctx.font = '10pt Calibri';
                let x = WIDTH / 2;
                let y = HEIGHT / 5;

                let lines = divideTextToLines(this.author, 3, 18);
                for (let i=0; i<lines.length; i++){
                    this.ctx.fillText(lines[i], x, y+(18*i));
                }


                this.ctx.font = '12pt Calibri';
                if (lines.length <= 2)
                    y = HEIGHT * 3 / 7;
                else
                    y = HEIGHT / 2;

                lines = divideTextToLines(this.title, 7, 14);
                for (let i=0; i<lines.length; i++){
                    this.ctx.fillText(lines[i], x, y+(18*i));
                }

                this.canvas.toBlob(function (blob) {
                    this.blob = blob;
                }.bind(this), 'image/jpeg', 1)

            },
            getBlob: function () {
                return this.blob
            },
            changeBackgroundHandler: function(){
                this.changeBackground();
                this.draw();
            },
            changeBackground: function(){
                this.gradient = this.ctx.createLinearGradient(0, 0, 0, HEIGHT);
                let color1 = this.getRandomHsl();
                let color2 = [color1[0], color1[1] , color1[2]-0.1];
                this.gradient.addColorStop(0,hlsToHex(color1));
                this.gradient.addColorStop(1, hlsToHex(color2));
            }
        },
        mounted() {
            this.canvas = this.$refs['generator-canvas'];
            this.canvas.width = WIDTH;
            this.canvas.height = HEIGHT;
            this.ctx = this.canvas.getContext('2d');
            this.changeBackgroundHandler();

            this.draw();
        }
    }
</script>

<style scoped>
    .holder{
        position: relative;
    }

    .change-background{
        position: absolute;
        left: 5px;
        top: 5px;
        background: #ffff00;
        border-radius: 50%;
        height: 25px;
        width: 25px;
        vertical-align: center;
        text-align: center;
    }
</style>