import { KoiPlugin } from "./koi-plugin";
import { KoiConstructor } from "./koi-typings";

/**
 * Koi 框架
 */
class Koi {
    /** 共享实例 */
    public static readonly Shared = new Koi();

    /**
     * 注册插件
     * @param name 插件名称
     * @param autoImport 是否自动导入(默认: false)
     * @returns 插件构造
     */
    public static Reg<T extends KoiPlugin>(name: string) {
        return function (cls: KoiConstructor<T>) {
            cls.prototype.name = name;
            Koi.Shared.use(cls);
            return cls;
        };
    }

    /** 名称 */
    public readonly name = "koi";
    /** 描述 */
    public readonly description = "一个致力于游戏插件化的框架";
    /** 作者 */
    public readonly author: string = "Koi Team | DoooReyn";
    /** 版本 */
    public readonly version: string = "0.0.1";

    /** 插件构造函数 */
    private readonly constructors: Map<string, KoiConstructor<KoiPlugin>> = new Map();
    /** 插件实例 */
    private readonly instances: Map<string, KoiPlugin> = new Map();

    /**
     * 使用插件
     * @param arg 插件构造/名称
     * @returns 插件实例
     */
    public use<P extends KoiPlugin>(arg: KoiConstructor<P> | string): P;
    public use<P extends KoiPlugin>(arg: string): P | null;
    public use<P extends KoiPlugin>(arg: KoiConstructor<P> | string): P | null {
        if (typeof arg === "string") {
            if (this.instances.has(arg)) {
                return this.instances.get(arg)! as P;
            }
            return null;
        } else {
            const name = arg.prototype.name;
            if (name === undefined) {
                throw new Error("请使用装饰器 Koi.Reg 注册插件");
            }
            if (this.constructors.has(name)) {
                return this.instances.get(name)! as P;
            }

            this.constructors.set(name, arg);

            const inst = new arg() as P;
            this.instances.set(name, inst);
            inst.onAttach();
            return inst;
        }
    }

    /**
     * 卸载插件
     * @param arg 插件构造
     */
    public disuse(arg: KoiConstructor<KoiPlugin> | string) {
        const name = typeof arg === "string" ? arg : arg.prototype.name;
        if (name === undefined) {
            throw new Error("请使用装饰器 Koi.Reg 注册插件");
        }
        if (this.constructors.delete(name)) {
            this.instances.get(name)?.onDetach();
            this.instances.delete(name);
        }
    }
}

export { Koi, KoiConstructor, KoiPlugin };
