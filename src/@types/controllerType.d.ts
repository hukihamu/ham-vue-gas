type ControllerType<C extends BaseControllerInterface> = {
    [K in keyof C]: (args?: C[K]['at']) => Promise<C[K]['rt']>
}




