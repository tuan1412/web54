import React from 'react';

const variantMap = {
  'primary': 'bg-blue-500',
  'danger': 'bg-red-500'
}

function Button({ label, variant = "primary", ...restProps }) {
  const bgCls = variantMap[variant];

  return (
    <button 
      className={`px-3 py-2 text-white ${bgCls}`}
      {...restProps}
    >
      {label}
    </button>
  )
}

export default Button;