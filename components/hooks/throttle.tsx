/**
 * 函数节流
 * @param fn 节流方法
 * @param time 间隔时间
 * @param config 配置 {first：首次点击是否执行 end：时间结束后是否执行}
 * @returns 
 */
export function throttle<T>(fn: T, time = 500, config: { first?: boolean, end?: boolean } = { first: true, end: false }): T {
    let canRun: boolean = true;
    if (typeof fn !== 'function') {
        throw new TypeError('类型错误，传入函数不是一个方法')
    }
    return function (this: unknown) {
            console.log('====46',time,config.first,canRun)

        const args = arguments
        if (config.first && canRun) fn.apply(this, args as any)
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            config.end && fn.apply(this, args as any)
            canRun = true;
        }, time);
    } as any;
}

