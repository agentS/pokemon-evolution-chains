const store = (() => {
  let _store;
  const setStore = (store) => {
    _store = store;
  };
  const getState = () => {
    return _store && _store.getState();
  };
  const getStore = () => {
    return _store;
  };
  const mapDispatchToProps = (component, props) => {
    Object.keys(props).forEach(actionName => {
      const action = props[actionName];
      Object.defineProperty(component, actionName, {
        get: () => (...args) => _store.dispatch(action(...args)),
        configurable: true,
        enumerable: true,
      });
    });
  };
  const mapStateToProps = (component, mapState) => {
    // TODO: Don't listen for each component
    const _mapStateToProps = (_component, _mapState) => {
      const mergeProps = mapState(_store.getState());
      Object.keys(mergeProps).forEach(newPropName => {
        const newPropValue = mergeProps[newPropName];
        component[newPropName] = newPropValue;
        // TODO: can we define new props and still have change detection work?
      });
    };
    const unsubscribe = _store.subscribe(() => _mapStateToProps());
    _mapStateToProps();
    return unsubscribe;
  };
  return {
    getStore,
    setStore,
    getState,
    mapDispatchToProps,
    mapStateToProps,
  };
})();
const globalFn = () => { };

var SearchActions;
(function (SearchActions) {
  SearchActions[SearchActions["TEXT_CHANGED"] = 0] = "TEXT_CHANGED";
})(SearchActions || (SearchActions = {}));
;
;
const searchTextChanged = (data) => async (dispatch, _getState) => {
  return dispatch({
    type: SearchActions.TEXT_CHANGED,
    payload: { data }
  });
};

export { SearchActions as S, searchTextChanged as a, store as s };
