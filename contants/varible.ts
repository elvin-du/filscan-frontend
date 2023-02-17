

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




export const defaultOpt = (type: string, theme:string ='light',) => { 
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
   
  }
    }
}




export const getColor = (theme:string) => { 
    return theme === "light" ? lightStyle : blackStyle  
}
