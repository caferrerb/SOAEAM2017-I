package amazon;

import java.util.HashMap;
import java.util.Map;

import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;

import util.Constantes;

/**
 * Clase para firmar las petición que iran a Amazon
 * 
 * @author Administrador
 *
 */
public class Firmar implements Callable {

	@SuppressWarnings("unchecked")
	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		Map<String, String> payLoad = (HashMap<String, String>) eventContext.getMessage().getPayload();
		SignedRequestsHelper signed = new SignedRequestsHelper();
		String url = "";
		if (payLoad.get(Constantes.OPERTATION).equals(Constantes.ITEMSEARCH)) {
			url = getURLSearchItems(signed, payLoad);
		} else if (payLoad.get(Constantes.OPERTATION).equals(Constantes.ITEMLOOKUP)) {
			url = getURLItemLookUp(signed, payLoad);
		}
		HashMap<String, String> result = new HashMap<>();
		result.put(Constantes.URL, url);
		return result;
	}

	/**
	 * Petición la cual busca objetos con base en una palabra clave
	 * 
	 * @param signed,
	 *            Objeto que firma Amazon.
	 * @param map,
	 *            Payload del proceso
	 * @return url de petición firmada
	 */
	public String getURLSearchItems(SignedRequestsHelper signed, Map<String, String> map) {
		Map<String, String> params = new HashMap<String, String>();
		params.put(Constantes.ASSOCIATETAG, Constantes.ASSOCIATETAG_VALUES);
		params.put(Constantes.OPERATION_ACTION, Constantes.ITEMSEARCH);
		params.put(Constantes.KEYWORDS, map.get(Constantes.ITEM));
		params.put(Constantes.RESPONSEGROUP, Constantes.ITEM_DESC);
		params.put(Constantes.SEARCHINDEX, Constantes.ALL);
		System.out.println(map.get(Constantes.PAGE));
		params.put(Constantes.ITEM_PAGE, map.get(Constantes.PAGE));
		return signed.sign(params);
	}

	/**
	 * Petición un objeto por su identificación.
	 * 
	 * @param signed,
	 *            Objeto que firma Amazon.
	 * @param map,
	 *            Payload del proceso
	 * @return url de petición firmada
	 */
	public String getURLItemLookUp(SignedRequestsHelper signed, Map<String, String> map) {
		Map<String, String> params = new HashMap<String, String>();
		params.put(Constantes.ASSOCIATETAG, Constantes.ASSOCIATETAG_VALUES);
		params.put(Constantes.OPERATION_ACTION, Constantes.ITEMLOOKUP);
		params.put(Constantes.ITEM_ID, map.get(Constantes.ITEM));
		params.put(Constantes.RESPONSEGROUP, Constantes.ITEM_DESC);
		params.put(Constantes.ID_TYPE, Constantes.TYPE_ASIN);
		return signed.sign(params);
	}

}
