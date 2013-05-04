/**
 * Created with JetBrains WebStorm.
 * User: aboud
 * Date: 5/4/13
 * Time: 3:47 PM
 * To change this template use File | Settings | File Templates.
 */
define(["util", "scene","point_dragger","straight_line"],
    (function(Util,Scene,PointDragger,StraightLine) {

        "use strict";

        /**
         * Control polygon object of a Bezier object
         * @param point1: first point of Bezier , first control point of Bezier
         * @param point2: second control point of Bzier
         * @param point3: third control point of Bezier
         * @param point4: last point of Bezier, fourth control point of Bezier
         * @constructor
         */
        var ControlPolygon = function(point1,point2,point3,point4){
            this.point1 = point1;
            this.point2 = point2;
            this.point3 = point3;
            this.point4 = point4;
            this.lineStyle = { width: "2", color: "#0000AA" };


        };

        /*
         * draw the control polygon
         */
        ControlPolygon.prototype.draw = function (context) {

            this.lineBetweenDraggers1_2 = new StraightLine(this.point1,this.point2,this.lineStyle);
            this.lineBetweenDraggers2_3 = new StraightLine(this.point2,this.point3,this.lineStyle);
            this.lineBetweenDraggers3_4 = new StraightLine(this.point3,this.point4,this.lineStyle);
            this.lineBetweenDraggers1_2.draw(context);
            this.lineBetweenDraggers2_3.draw(context);
            this.lineBetweenDraggers3_4.draw(context);



        };



        return ControlPolygon;
    }));