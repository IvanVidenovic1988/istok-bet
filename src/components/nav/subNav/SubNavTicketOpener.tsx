import React from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { setTicket } from '../../../redux/ticket';

const SubNavTicketOpener = () => {

    const dispatch = useAppDispatch();

    return (
        <div
            onClick={() => dispatch(setTicket())}
            className='bg-[#525455] rounded-sm w-[100px] flex-center md:hidden'
        >
            <span className='text-white'>Betslip</span>
        </div>
    );
}

export default SubNavTicketOpener;