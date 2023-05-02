export abstract class Controller<C extends BaseControllerType> {
    abstract run<K extends keyof C>(args: C[K]['aType']): Promise<C[K]['rType']>
}