/**
 * Created with JetBrains WebStorm.
 * User: aboud
 * Date: 4/29/13
 * Time: 10:19 AM
 * To change this template use File | Settings | File Templates.
 */
define(["util", "vec2", "scene", "point_dragger","parametric_curve"],
    (function(Util,vec2,Scene,PointDragger, ParametricCurve) {

        "use strict";
    var BezierCurve = function(style,point1,point2,point3,point4,seg){

        this.style = style;
        this.min_t = 0;
        this.max_t = 1;

        // Hier muss man statt point[0] Werte rein bekommen, zusammen als String x_func bauen and an die ParametricCurve Methode übergeben
        this.x_func = point1[0]* Math.pow((1-t),3) + 3*Math.pow((1-t),2)*t*point2[0] + 3*(1-t)*t*t* point3[0] + Math.pow(t,3)* point4[0];
        this.y_func = point1[1]* Math.pow((1-t),3) + 3*Math.pow((1-t),2)*t*point2[1] + 3*(1-t)*t*t* point3[1] + Math.pow(t,3)* point4[1];
        this.seg = seg;

        this.bezier = new ParametricCurve(this.style, this.x_func, this.y_func, this.min_t,this.max_t,this.seg);



    };

    BezierCurve.prototype.draw = function(context){
        this.bezier.draw();
    };
    return BezierCurve;
    })); // define