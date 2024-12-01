function Controller(baseRoute: `/${string}`) {
  return (target: Object) => {
    Reflect.defineMetadata("baseRoute", baseRoute, target);
  };
}

export default Controller;
