import { useState } from "react"

export const ToolBox = (props: {
    sidebarWidth: number
}) => {

    const [pressedButton, setPressedButton] = useState('');
    const DRAW_BUTTON = 'draw';
    const ARROW_BUTTON = 'arrow';

    return (
        <div
            id='placeholder-toolbox'
            style={{
                width: '30vw',
                height: '7.5vh',
                top: `1vh`,
                left: `${props.sidebarWidth + 25}px`,
                position: 'absolute',
                backgroundColor: '#fff8e7',
                borderRadius: 15

            }}
        >
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    paddingLeft: 20,
                    justifyContent: 'left',
                    alignItems: 'center'
                }}
            >

                {createToolboxButton(DRAW_BUTTON,
                    "",
                    handleDrawButtonClick(pressedButton === DRAW_BUTTON),
                    pressedButton,
                    setPressedButton)}

                {createToolboxButton(ARROW_BUTTON,
                    "",
                    () => {},
                    pressedButton,
                    setPressedButton)}


            </div>
        </div>
    )
}

const createToolboxButton = (
    buttonName: string,
    image: string,
    onClick: () => any,
    pressedButton: any,
    setPressedButton: any
) => (<div

    onClick={() => {

        setPressedButton(pressedButton === buttonName ? '' : buttonName);
        onClick();
    }}

    style={{
        width: '3vw',
        height: '3vw',
        color: 'black',
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#add8e6',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        userSelect: 'none',
        boxShadow: pressedButton
            && pressedButton === buttonName ? "" : "1px 3px 1px #9E9E9E"
    }}
>
    {buttonName}
</div>)

const handleDrawButtonClick = (previouslyActive: boolean) => () => {
    console.log(`Button is now ${!previouslyActive ? 'active' : 'inactive'}`);
}