'use client';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    
    user && (
      <div className='  flex justify-end px-8'>
        <div className=''>
            <div className='font-bold text-2xl'>User profile</div>
            
            {user.picture && (
            <Image src={user.picture} alt={user.name || 'User'} width={150} height={150} className='rounded-full'/>
            )}
            
            <h2>{user.name}</h2>
            <p>{user.email}</p>

        </div>
        
      </div>
    )
  );
}