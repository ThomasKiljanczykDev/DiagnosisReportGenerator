// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/reports`
  | `/settings/diagnoses`
  | `/settings/genes`
  | `/settings/illnesses`
  | `/settings/mutations`
  | `/settings/recommendations`
  | `/settings/staff`
  | `/settings/test-methods`

export type Params = {
  
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
