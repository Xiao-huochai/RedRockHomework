function Promise(excutor) {
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //声明属性
    this.callbacks = [];

    //一.保存实例对象this的值
    const self = this;
    //执行后状态改变（PromiseState） 设置对象结果值(PromiseResult)
    function resolve(data) {
        //这里面的this与外面的this指向的不一样 是指向的window
        //因此有了(一.)处的代码保存this
        //保证状态只更改一次
        if (self.PromiseState !== 'pending') return;
        self.PromiseState = 'fulfilled';
        self.PromiseResult = data;
        //调用成功的回调函数？？？

        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onResolved(data)
            })
        });


    }
    function reject(data) {
        if (self.PromiseState !== 'pending') return;
        self.PromiseState = 'rejected';
        self.PromiseResult = data;
        //执行失败的回调函数

        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onResolved(data)
            })
        });

    }
    try {
        //同步调用执行器函数式
        excutor(resolve, reject);//里面有时会有throw因此这里有try catch
    } catch (e) {
        //修改Promise对象状态为失败
        reject(e);
    }

}
//添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;

    return new Promise((resolve, reject) => {
        //封装函数
        function callback(type) {
            try {
                //获取执行函数的回调结果
                let result = type(self.PromiseResult);
                //判断 如果返回的是Promise实例
                if (result instanceof Promise) {
                    //如果是promise对象
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    })
                } else {
                    //结果的对象状态为成功
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }
        if (this.PromiseState === 'fulfilled') {
            setTimeout(() => {
                callback(onResolved);
            });

        }
        if (this.PromiseState === 'rejected') {
            setTimeout(() => {
                callback(onRejected);
            });
        }
        //判断pending
        if (this.PromiseState === 'pending') {
            //保存回调函数 状态不确定
            this.callbacks.push({
                onResolved: function () {
                    callback(onResolved);
                },
                onRejected: function () {
                    callback(onRejected);
                }
            });
        }
    })

}