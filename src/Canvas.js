import React from "react";

class Canvas extends React.Component {

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        var imageData = ctx.createImageData(640, 425);
        for (let i = 0; i < 100; i += 4) {
            imageData.data[i] = 255;  // red   color
            imageData.data[i + 1] = 0;  // green color
            imageData.data[i + 2] = 0;  // blue  color
            imageData.data[i + 3] = 255;
        }

        var canvasX = 25;
        var canvasY = 25;

        ctx.putImageData(imageData, canvasX, canvasY);

        //https://codepen.io/rachsmith/pen/ZObMOP?editors=0111
        //https://jsfiddle.net/drau/T4fqu/
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" width={640} height={425} color={'#111111'}/>
            </div>
        )
    }
}


export default Canvas;

