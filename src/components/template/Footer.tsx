import Container from '@/components/shared/Container'
import classNames from '@/utils/classNames'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'
import { HiHome, HiUser} from 'react-icons/hi'
import { GiMoneyStack } from "react-icons/gi";
import { BsCurrencyExchange } from "react-icons/bs";
import { Link } from 'react-router-dom'; 

import {useThemeStore} from '@/store/themeStore';

export type FooterPageContainerType = 'gutterless' | 'contained'

type FooterProps = {
    pageContainerType: FooterPageContainerType
    className?: string
}

const FooterContent = () => {

    const { mode } =  useThemeStore();


    return (
           <>
            <div className="flex items-center justify-between flex-auto w-full">
                <span>
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-bold">Nelore Invest</span> Todos os direitos reservados.
                </span>
            
            </div>

            {mode === 'light' && (

                    <footer className="fixed bottom-0 left-0 w-full bg-slate-100 shadow-md p-4 flex justify-around items-center md:hidden">
                        <Link to="/dashboard" className="flex flex-col items-center text-gray-700">
                            <HiHome size={24} />
                            <span className="text-xs">Início</span>
                        </Link>
                        <Link to="/deposits" className="flex flex-col items-center text-gray-700">
                            <GiMoneyStack size={24} />
                            <span className="text-xs">Depositar</span>
                        </Link>
                        <Link to="/invest-now" className="flex flex-col items-center text-gray-700">
                            <BsCurrencyExchange size={24} />
                            <span className="text-xs">Investir</span>
                        </Link>
                        <Link to="/concepts/account/settings" className="flex flex-col items-center text-gray-700">
                            <HiUser size={24} />
                            <span className="text-xs">Perfil</span>
                        </Link>
                    </footer>
               
            )}

            {mode === 'dark' && (
              <footer className="fixed bottom-0 left-0 w-full bg-stone-900 shadow-md p-4 flex justify-around items-center md:hidden">
                    <Link to="/dashboard" className="flex flex-col items-center text-slate-200">
                        <HiHome size={24} />
                        <span className="text-xs">Início</span>
                    </Link>
                    <Link to="/deposits" className="flex flex-col items-center text-slate-200">
                        <GiMoneyStack size={24} />
                        <span className="text-xs">Depositar</span>
                    </Link>
                    <Link to="/invest-now" className="flex flex-col items-center text-slate-200">
                        <BsCurrencyExchange size={24} />
                        <span className="text-xs">Investir</span>
                    </Link>
                    <Link to="/concepts/account/settings" className="flex flex-col items-center text-slate-200">
                        <HiUser size={24} />
                        <span className="text-xs">Perfil</span>
                    </Link>
             </footer>
            )}
        </>
       
    )
}

export default function Footer({
    pageContainerType = 'contained',
    className,
}: FooterProps) {
    return (
        <footer
            className={classNames(
                `footer flex flex-auto items-center h-16 ${PAGE_CONTAINER_GUTTER_X}`,
                className,
            )}
        >
            {pageContainerType === 'contained' ? (
                <Container>
                    <FooterContent />
                </Container>
            ) : (
                <FooterContent />
            )}
        </footer>
    )
}
