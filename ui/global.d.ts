declare module '*.scss' {
  type IClassNames = Record<string, string>
  const classNames: IClassNames
  export = classNames
}

declare module '*.css' {
    type IClassNames = Record<string, string>
    const classNames: IClassNames
    export = classNames
}

declare module '*.woff';
declare module '*.woff2';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    const SVG: React.FunctionComponent<React.SVGAttributes<SVGAElement>>
    export default SVG
}

declare const __REACT_APP_API_ADDRESS__: string
declare const __IS_DEV__: boolean

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
}
