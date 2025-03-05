

import { AdaptiveCard, Container } from '@/components/shared';
import UsersList from './components/UsersList';
import { useParams } from 'react-router-dom';
import { useStoreuser } from '@/store/admin/users';

const Users = () => {

        const { role } = useParams();
        const { users } = useStoreuser();
        return (
            
            <Container>
                <h4  className='mb-6'>{role == 'sponsor' ? 'Duplicadores' : 'Clientes'} ({users.meta.total})</h4>
                <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        
                        {/* <h1>Users - {role}</h1> */}
                        
                        </div>
                        </div>

                        <UsersList />
                </AdaptiveCard>
            </Container>
            
        )
}


export default Users;