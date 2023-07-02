import React from 'react';
import { ComingSoonWrapper } from '@styles/Upgrade.styled';

interface ComingSoonProps {
    selected: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = (props) => {
    const { selected } = props;
    return (
        <ComingSoonWrapper className={selected}>
            <div>
                {/* <img src={VPass} alt="Venkman Pass" className="w-1/2 h-auto rounded-lg mx-auto" /> */}
            </div>
            <h2>Coming Soon</h2>
            <p>This will be coming soon</p>
        </ComingSoonWrapper>
    );
};
