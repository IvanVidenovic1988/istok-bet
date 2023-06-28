import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../shared/redux/hooks';
import { TicketItem, removeFromTicket } from '../redux/ticket';
import { isEmpty } from 'lodash';
import { removeActiveOutcomeId } from '../../events/redux/events';

const DesktopTicket = () => {

    const ticketItems = useAppSelector((state) => state.ticket.ticketItems)
    const ticketItemsCount = Object.entries(ticketItems).length

    const dispatch = useAppDispatch()

    const handleRemoveFromTIcket = (ticketItems: TicketItem, activeId: number) => {
        dispatch(removeFromTicket(ticketItems))
        dispatch(removeActiveOutcomeId(activeId))
    }

    return (
        <>
            <div className='mr-3 bg-[#1a1c1d] sticky h-full'>
                <div className='h-[46px] bg-[#ffbb1a] border-b-[2px] border-[#ffbb1a] flex-center'>
                    <p className='text-[#2c2e30] font-bold'>Tiket</p>
                    {ticketItemsCount === 0 ?
                        ""
                        :
                        <span className='w-[18px] h-[18px] flex-center ml-1 text-[12px] text-[#ffc107] font-bold bg-[#2c2e30] rounded-sm'>
                            {ticketItemsCount}
                        </span>
                    }
                </div>
                <div className='h-[52px] mx-[10px] flex items-center'>
                    <div className='w-[60%] h-8 text-[14px] text-[#ffbb1a] flex-center border border-[#ffbb1a]'>
                        Kombinovani
                    </div>
                    <div className='w-[40%] text-white text-[14px] flex-center'>
                        Sistem
                    </div>
                </div>
                {isEmpty(ticketItems) ?
                    <div className='h-[120px] px-[50px] bg-[#242628] flex-center text-center'>
                        <p className='text-white'>Odaberi opkladu klikom na zeljenu kvotu</p>
                    </div>
                    :
                    <div>
                        {Object.entries(ticketItems).map(([name, tekme]) => (
                            <div key={name + (Math.random() * 1000)}>
                                {tekme.length > 0 &&
                                    <div className='bg-[#2c2e30] px-[10px] pt-[10px] pb-[7px] border-b border-black'>
                                        <span className='text-[14px] text-white'>{name}</span>
                                        {tekme.map((tekma) => (
                                            <div key={tekma.id + (Math.random() * 1000)}>
                                                <div className='mb-2 text-[14px] flex justify-between'>
                                                    <div>
                                                        <span className='mr-1 text-[#acacad] lowercase'>{tekma.marketsName}</span>
                                                        {tekma.marketsSpecialValue.valueOf() > 0 ? <span className='text-[#acacad]'>({tekma.marketsSpecialValue})</span> : <span></span>}
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveFromTIcket(tekma, tekma.outcomeId)}
                                                        className='w-4 h-4 text-[16px] border-[#ffbb1a] border rounded-lg flex-center relative'
                                                    ><span className='absolute text-[#ffbb1a] top-[-7px] left-[3px]'>x</span>
                                                    </button>
                                                </div>
                                                <div className='h-[30px] mb-3 px-[10px] bg-[#242628] flex items-center justify-between'>
                                                    <span className='w-[82%] text-[14px] text-[#acacad]'>{tekma.tip}</span>
                                                    <span className='text-[14px] text-white '>{tekma.odd}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                }
                <div className='h-[90px] mt-[10px] p-[10px] bg-[#242628]'>

                </div>
            </div>
        </>
    );
}

export default DesktopTicket;
