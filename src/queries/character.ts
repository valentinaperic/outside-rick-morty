import { gql } from "@apollo/client";

export const CHARACTER_QUERY = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
    }
  }
`;

export const CHARACTER_IMAGE_QUERY = gql`
  query GetCharacterImage($id: ID!) {
    character(id: $id) {
      id
      image
    }
  }
`;

export const FILTER_CHARACTERS_QUERY = gql`
  query FilterCharacters($species: String!, $page: Int) {
    characters(filter: { species: $species }, page: $page) {
      info {
        count
        pages
        next
      }
      results {
        id
        name
        species
        gender
        image
      }
    }
  }
`;