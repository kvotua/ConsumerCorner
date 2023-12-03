const Loader = () => (
  <svg version="1.1" id="L9" x="0px" y="0px" width={'50px'} height={'60px'} enableBackground="new 0 0 0 0">
    <rect x="0" y="0" width="10" height="40" fill="#fff">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin="0"
        dur="2s"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="20" y="0" width="10" height="40" fill="#fff">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin="0.2s"
        dur="2s"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="40" y="0" width="10" height="40" fill="#fff">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin="0.4s"
        dur="2s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
);

export { Loader };
