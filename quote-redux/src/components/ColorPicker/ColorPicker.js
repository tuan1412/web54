import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveColor } from '../../redux/colorSlice';
import './ColorPicker.css';

function ColorPicker() {
  const colors = useSelector(state => state.color.colors);
  const activeColor = useSelector(state => state.color.activeColor);
  const dispatch = useDispatch();

  return (
    <div className="ColorPicker">
      {colors.map(color => {
        const style = { backgroundColor: color };
        const cls = color === activeColor ? 'color-item active' : 'color-item';

        return (
          <span 
            key={color} 
            className={cls} 
            style={style}
            onClick={() => {
              dispatch(setActiveColor(color))
              // dispatch action
              // khong thay doi truc tiep color duoc o day

            }}
          />
        )
      })}
    </div>
  )
}



export default ColorPicker;
