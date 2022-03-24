import { gql } from '@apollo/client/core';
import { apolloClient } from '../apollo-client';
import { login } from '../authentication/login';
import { getAddressFromSigner } from '../ethers.service';
import { prettyJSON } from '../../helpers/prettyJSON';

const CLAIM_HANDLE = `
  mutation($request: ClaimHandleRequest!) { 
    claim(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
			__typename
    }
 }
`;

// handleId = the id returned from the claimable handle to use
// it is not the handle itself!
const claimHandle = (handleId: number) => {
  return apolloClient.mutate({
    mutation: gql(CLAIM_HANDLE),
    variables: {
      request: {
        id: handleId,
      },
    },
  });
};

export const claim = async () => {
  const address = getAddressFromSigner();
  console.log('claim: address', address);

  await login(address);

  const result = await claimHandle(1);
  prettyJSON('claim: result', result.data);

  return result.data;
};