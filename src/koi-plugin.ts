/**
 * 插件基类
 */
abstract class KoiPlugin {
    /** 名称 */
    abstract readonly name: string;
    /** 版本 */
    abstract readonly version: string;
    /** 描述 */
    abstract readonly description: string;
    /** 作者 */
    abstract readonly author: string;
    /** 插件挂载回调 */
    abstract onAttach(): void;
    /** 插件卸载回调 */
    abstract onDetach(): void;
}

export { KoiPlugin };
