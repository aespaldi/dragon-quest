import React from 'react';

export default function HelpText(props) {
  if (props.mergeMode) {
    return (
      <p>
        Scroll through your cards and click 'Merge' to add a dragon to your mergelist. You can only merge two, and you cannot merge the same dragon twice. When you think you have your winning combination, click 'Prepare to Merge' to finalize your choice.
      </p>
    );
  } else {
    return (
      <p>
        Call a dragon and accept her to add her to your defense squad, or send her away to try for another type! You can only have ten at any given time. Click "fight" on a dragon's card to face off against a human that blunders into the village. Each successive human you face might be a little bit harder. You will level up after a successful battle, or you can merge two dragons for a chance to create a powerful new dragon.
      </p>
    );
  }
};
