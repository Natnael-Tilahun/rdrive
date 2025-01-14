import axios from 'axios'
import useSWRInfinite from 'swr/infinite'

import type { OdAPIResponse } from '../types'
import { getConnectedAccounts } from './getConnectedAccounts'

import { getStoredToken } from './protectedRouteHandler'

export async function fetcher(url: string, token?: string) {
  const xConnectedAccounts = getConnectedAccounts();

  try {
    const headers = {};
    if (token) headers['od-protected-token'] = token;
    if (xConnectedAccounts) headers['x-connected-accounts'] = xConnectedAccounts;
    const response = await axios.get(url[0], { headers });
    return response.data;
  } catch (err: any) {
    console.log(err, "Error from fetchWithSWR");
    throw { status: err.response.status, message: err.response.data };
  }
}


/**
 * Paging with useSWRInfinite + protected token support
 * @param path Current query directory path
 * @returns useSWRInfinite API
 */
export function useProtectedSWRInfinite(path: string = '') {
  const hashedToken = getStoredToken(path)

  /**
   * Next page infinite loading for useSWR
   * @param pageIdx The index of this paging collection
   * @param prevPageData Previous page information
   * @param path Directory path
   * @returns API to the next page
   */

  function getNextKey(pageIndex: number, previousPageData: OdAPIResponse): (string | null)[] | null {
    // Reached the end of the collection

    if (previousPageData && !previousPageData.folder) return ["/api/?path=/"]

    // First page with no prevPageData
    if (pageIndex === 0) return [`/api/?path=${path}`, hashedToken]

    // Add nextPage token to API endpoint
    return [`/api/?path=${path}&next=${previousPageData.next}`, hashedToken]
  }

  // Disable auto-revalidate, these options are equivalent to useSWRImmutable
  // https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
  const revalidationOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  }

  return useSWRInfinite(getNextKey, fetcher, revalidationOptions)
}
