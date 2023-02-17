

//base charts colors
export const colors = ['#F6BD16', '#5AD8A6', '#0090FF']
   const lightStyle = {
        lineStyle: "rgba(0,0,0,0.15)",
        splitLine: "rgba(0,0,0,0.15)",
        textStyle: "#333333",
        itemBorder: "#ffffff"
      }
      const blackStyle = {
        lineStyle: "rgba(255,255,255,0.15)",
        splitLine: "rgba(255,255,255,0.15)",
        textStyle: "#ffffff",
        itemBorder: "#ffffff"
      }




export const defaultOpt = (type: string, theme:string ='light') => { 
    const color = getColor(theme)
    switch (type) { 
        case 'line':
            return {
    xAxis: {
      type: "category",
      axisLabel: {
        textStyle: {
          color: color.textStyle,
        },
      },
      axisLine: {
        lineStyle: {
          color: color.splitLine,
        },
      },
      lightStyle: {
        color: color.lineStyle,
      },
      axisTick: {
        show: false,
      },
      data: [],
      // boundaryGap: false
    },
    yAxis: [
      {
        type: "value",
        position: "left",
        nameTextStyle: {
          color: color.textStyle,
        },
        // max: (v: any) => parseInt(v.max / 0.5),
        axisLabel: {
          formatter: "{value} PiB",
          textStyle: {
            // fontSize: this.fontSize,
            color: color.textStyle,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: "dashed",
            color: color.splitLine,
          },
        },
      },
      {
        type: "value",
        position: "right",
        nameTextStyle: {
          color: color.textStyle,
        },
        // min: v => Number(v.max - (v.max - v.min) / 0.6).toFixed(1),
        // max: v => Number(v.max / 0.8).toFixed(1),
        // interval: 1,
        axisLabel: {
          formatter: "{value} EiB",
          textStyle: {
            //  fontSize: this.fontSize,
            color: color.textStyle,
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: color.splitLine,
          },
        },
      },
    ],
    legend: {
      // data: this.tr("yAxisName"),
      lineStyle: {
        color: "#ffffff",
      },
      textStyle: {
        // fontSize: this.fontSize,
        color: color.textStyle,
      },
      formatter(v: any) {
        return v;
      },
      icon: "circle",
    },
    tooltip: {
      trigger: "axis",
      formatter(v: any) {
        var result = v[0].name;
        var options = ["EiB", "EiB", "PiB"];
        v.forEach((item: any) => {
          if (item.data) {
            result +=
              "<br/>" +
              item.marker +
              item.seriesName +
              ": " +
              item.data +
              options[item.componentIndex];
          }
        });
        return result;
      },
    },
  }
    }
}


export const getColor = (theme:string) => { 
    return theme === "light" ? lightStyle : blackStyle  
}
