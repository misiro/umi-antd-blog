import {PropsWithChildren} from "react";
import {Button} from 'antd';

function CustomButton(props: PropsWithChildren<{ onClick(): void, className?: string }>) {
    return <Button onClick={props.onClick} type="primary">
        {props.children}
    </Button>
}

export default CustomButton
