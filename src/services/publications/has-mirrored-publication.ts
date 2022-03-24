import { gql } from '@apollo/client/core';
import { apolloClient } from '../apollo-client';
import { prettyJSON } from '../../helpers/prettyJSON';

const HAS_MIRRORED = `
  query($request: HasMirroredRequest!) {
    hasMirrored(request: $request) {
      profileId
      results {
        mirrored
        publicationId
      }
    }
  }
`;

const hasMirroredRequest = (
  profilesRequest: { profileId: string; publicationIds: string[] }[]
) => {
  return apolloClient.query({
    query: gql(HAS_MIRRORED),
    variables: {
      request: {
        profilesRequest,
      },
    },
  });
};

export const hasMirrored = async () => {
  const result = await hasMirroredRequest([
    {
      profileId: '0x032f1a',
      publicationIds: ['0x032f1a-0x02'],
    },
    {
      profileId: '0x05',
      publicationIds: ['0x032e32-0x01'],
    },
  ]);
  prettyJSON('has mirrored: result', result.data);

  return result.data;
};