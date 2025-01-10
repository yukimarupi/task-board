//ヘッダー全体をラップするレイアウト用コンポーネント。
import React from 'react';
import TabHeader from './TabHeader';
import SubHeader from './SubHeader';

const HeaderWrapper: React.FC = () => {
  return (
    <div>
      <TabHeader />
      <SubHeader />
    </div>
  );
};

export default HeaderWrapper;
