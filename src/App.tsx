import "./App.css";
import React from "react";

enum ParamTypes {
  String = "string",
  Number = "number",
  Select = "select",
}

interface Param {
  id: number;
  name: string;
  type: ParamTypes;
}

interface Color {
  colorName: string;
}
interface ParamValue {
  paramId: number;
  value: string | number;
}
interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}
interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  public getModel = () => {
    return console.log({ paramValues: this.state.paramValues, colors: this.props.model.colors });
  };

  public handleChangeParam = (value: string | number, id: number) => {
    const changeValue = this.state.paramValues.map((paramValue) => {
      if (paramValue.paramId === id) return { ...paramValue, value };
      return paramValue;
    });
    this.setState((state) => ({ ...state, paramValues: changeValue }));
  };

  render(): React.ReactNode {
    return (
      <div>
        {this.props.params.map((i) => {
          const currentValue = this.state.paramValues.find((value) =>
            value.paramId === i.id ? value.value : ""
          );
          return (
            <div className="form_wrapper">
              {i.name}
              {i.type === ParamTypes.String && (
                <input
                  type="text"
                  name={i.name}
                  id=""
                  value={currentValue?.value}
                  onChange={(event) => this.handleChangeParam(event.target.value, i.id)}
                />
              )}
              {i.type === ParamTypes.Number && (
                <input
                  type="number"
                  name={i.name}
                  id=""
                  value={currentValue?.value}
                  onChange={(event) => this.handleChangeParam(event.target.value, i.id)}
                />
              )}
              {i.type === ParamTypes.Select && (
                <select onChange={(event) => this.handleChangeParam(event.target.value, i.id)}>
                  {[1, 2, 3].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
        <button className="change" onClick={this.getModel}>
          Внести изменения
        </button>
      </div>
    );
  }
}

const App = () => {
  const params = [
    {
      id: 1,
      name: "Назначение",
      type: ParamTypes.String,
    },
    {
      id: 2,
      name: "Длина",
      type: ParamTypes.String,
    },
    {
      id: 3,
      name: "Опция",
      type: ParamTypes.Number,
    },
    {
      id: 4,
      name: "Опция2",
      type: ParamTypes.Select,
    },
  ];

  const model = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное",
      },
      {
        paramId: 2,
        value: "макси",
      },
      {
        paramId: 3,
        value: "1",
      },
      {
        paramId: 4,
        value: "3",
      },
    ],
  };
  return <ParamEditor params={params} model={model} />;
};

export default App;
