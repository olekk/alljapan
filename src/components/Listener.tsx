import * as React from 'react';
interface IListenerProps<T extends Event> {
    event: string;
    callback: (evt: T) => void;
}

export class Listener<T extends Event> extends React.Component<IListenerProps<T>> {
    public componentDidMount(): void {
        window.addEventListener(this.props.event, this.callback as EventListener);
    }

    public componentWillUnmount() {
        window.removeEventListener(this.props.event, this.callback as EventListener);
    }

    public render() {
        return null;
    }

    private callback = (e: T) => {
        this.props.callback(e);
    }
}
