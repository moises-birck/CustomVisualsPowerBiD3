
"use strict";


import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import * as d3 from "d3";

export class Visual implements IVisual {
    private svgRoot: d3.Selection<SVGElement, {}, HTMLElement, any>;
    private ellipse: d3.Selection<SVGElement, {}, HTMLElement, any>;
    private text: d3.Selection<SVGElement, {}, HTMLElement, any>;
    private padding: number = 20;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.svgRoot = d3.select(options.element).append("svg");
        this.ellipse = this.svgRoot.append("ellipse");
            // .attr("fill", "#FEBF0F");
        this.text = this.svgRoot.append("text")
            .text("Hello D3");
            // .attr("text-anchor", "middle")
            // .attr("dominant-baseline", "central");
        // this.target = options.element;
        // this.updateCount = 0;
        // if (typeof document !== "undefined") {
        //     const new_p: HTMLElement = document.createElement("p");
        //     new_p.appendChild(document.createTextNode("Update count:"));
        //     const new_em: HTMLElement = document.createElement("em");
        //     this.textNode = document.createTextNode(this.updateCount.toString());
        //     new_em.appendChild(this.textNode);
        //     new_p.appendChild(new_em);
        //     this.target.appendChild(new_p);
        // }
    }

    public update(options: VisualUpdateOptions) {
        // this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        // console.log('Visual update', options);
        // if (typeof this.textNode !== "undefined") {
        //     this.textNode.textContent = (this.updateCount++).toString();
        // }
        this.svgRoot
                .attr("width", options.viewport.width)
                .attr("height", options.viewport.height);
        
            var plot = {
                xOffset: this.padding,
                yOffset: this.padding,
                width: options.viewport.width - (this.padding * 2),
                height: options.viewport.height - (this.padding * 2),
            };
        
            this.ellipse
                .attr("cx", plot.xOffset + (plot.width * 0.5))
                .attr("cy", plot.yOffset + (plot.height * 0.5))
                .attr("rx", (plot.width * 0.5))
                .attr("ry", (plot.height * 0.5))
        
            var fontSizeForWidth: number = plot.width * .20;
            var fontSizeForHeight: number = plot.height * .35;
            var fontSize: number = d3.min([fontSizeForWidth, fontSizeForHeight]);
        
            this.text
                .attr("x", plot.xOffset + (plot.width / 2))
                .attr("y", plot.yOffset + (plot.height / 2))
                .attr("width", plot.width)
                .attr("height", plot.height)
                .attr("font-size", fontSize);
    }

    // private static parseSettings(dataView: DataView): VisualSettings {
    //     return VisualSettings.parse(dataView) as VisualSettings;
    // }

    // /**
    //  * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
    //  * objects and properties you want to expose to the users in the property pane.
    //  *
    //  */
    // public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    //     return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    // }
}