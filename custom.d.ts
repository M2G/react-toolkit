declare module '*.scss' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module "*.module.scss" {
  const styles: { [className: string]: any };
  export default styles;
}
