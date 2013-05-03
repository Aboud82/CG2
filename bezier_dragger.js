/**
 * Created with JetBrains WebStorm.
 * User: aboud
 * Date: 5/2/13
 * Time: 5:18 PM
 * To change this template use File | Settings | File Templates.
 */
define(["util", "scene","point_dragger","straight_line"],
    (function(Util,Scene,PointDragger,StraightLine) {

        "use strict";

        var BezierDragger = function(_bezier,getPos, setPos, drawStyle) {

            // remember the callbacks
            this.getPos = getPos;
            this.setPos = setPos;

            // default draw style for the dragger
            drawStyle = drawStyle || {};
            this.drawStyle = {};
            this.drawStyle.radius = drawStyle.radius || 5;
            this.drawStyle.width = drawStyle.width || 2;
            this.drawStyle.color = drawStyle.color || "#ff0000";
            this.drawStyle.fill = drawStyle.fill || false;

            // attribute queried by SceneController to recognize draggers
            this.isDragger = true;

            this.pointDragger = new PointDragger(getPos,setPos,drawStyle);

            this.lineStyle = { width: "2", color: "#0000AA" };
            this.point1 = _bezier.point1;
            this.point2 = _bezier.point2;
            this.point3 = _bezier.point3;
            this.point4 = _bezier.point4;
            this.lineBetweenDraggers1_2 = new StraightLine(this.point1,this.point2,this.lineStyle);
            this.lineBetweenDraggers2_3 = new StraightLine(this.point2,this.point3,this.lineStyle);
            this.lineBetweenDraggers3_4 = new StraightLine(this.point3,this.point4,this.lineStyle);
        };

        /*
         * draw the dragger as a small circle
         */
       BezierDragger.prototype.draw = function (context) {
      /* this.pointDragger.draw(context);*/
           this.lineBetweenDraggers1_2.draw(context);
           this.lineBetweenDraggers2_3.draw(context);
           this.lineBetweenDraggers3_4.draw(context);

          // what is my current position?
           var pos = this.getPos();

           // what shape to draw
           context.beginPath();
           context.arc(pos[0], pos[1], // position
               this.drawStyle.radius,    // radius
               0.0, Math.PI*2,           // start and end angle
               true);                    // clockwise
           context.closePath();

           // draw style
           context.lineWidth   = this.drawStyle.width;
           context.strokeStyle = this.drawStyle.color;
           context.fillStyle   = this.drawStyle.color;

           // trigger the actual drawing
           if(this.drawStyle.fill) {
               context.fill();
           };
           context.stroke();
       };

       BezierDragger.prototype.isHit = function (context,mousePos) {
      /* return this.pointDragger.isHit(context,mousePos);*/
           // what is my current position?
           var pos = this.getPos();

           // check whether distance between mouse and dragger's center
           // is less or equal ( radius + (line width)/2 )
           var dx = mousePos[0] - pos[0];
           var dy = mousePos[1] - pos[1];
           var r = this.drawStyle.radius+this.drawStyle.width/2;
           return (dx*dx + dy*dy) <= (r*r);
       };

        BezierDragger.prototype.mouseDrag = function (dragEvent) {

            // change position of the associated original (!) object
            this.setPos(dragEvent);

        };

        return BezierDragger;
    }));