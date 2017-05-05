package amazon;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
//import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.SortedMap;
import java.util.TimeZone;
import java.util.TreeMap;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import util.Constantes;

public class SignedRequestsHelper {

	private SecretKeySpec secretKeySpec = null;
	private Mac mac = null;

	public SignedRequestsHelper() throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
		byte[] secretyKeyBytes = Constantes.AWS_SECRET_KEY.getBytes(Constantes.UTF8);
		secretKeySpec = new SecretKeySpec(secretyKeyBytes, Constantes.ALGORITMO_HMAC_SHA);
		mac = Mac.getInstance(Constantes.ALGORITMO_HMAC_SHA);
		mac.init(secretKeySpec);
	}

	public String sign(Map<String, String> params) {
		params.put(Constantes.LABEL_AWS_ACCESS_KEY_ID_AMAZON, Constantes.AWS_ACCESS_KEY_ID_AMAZON);
		params.put(Constantes.TIMESTAMP, timestamp());
		SortedMap<String, String> sortedParamMap = new TreeMap<String, String>(params);
		String canonicalQS = canonicalize(sortedParamMap);
		String toSign = Constantes.GET + Constantes.SALTO_LINEA + Constantes.ENDPOINT_AMAZON + Constantes.SALTO_LINEA
				+ Constantes.REQUEST_URI + Constantes.SALTO_LINEA + canonicalQS;
		String hmac = hmac(toSign);
		String sig = percentEncodeRfc3986(hmac);
		String url = Constantes.REQUEST_URI + Constantes.INTERROGANTE + canonicalQS + Constantes.Y_ENLACE
				+ Constantes.LABEL_SIGNATURE + Constantes.IGUAL + sig;
		System.err.println(url);
		return url;
	}

	private String hmac(String stringToSign) {
		String signature = null;
		byte[] data;
		byte[] rawHmac;
		try {
			data = stringToSign.getBytes(Constantes.UTF8);
			rawHmac = mac.doFinal(data);
			signature = new String(java.util.Base64.getEncoder().encode(rawHmac));
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(Constantes.UTF8 + " is unsupported!", e);
		}
		return signature;
	}

	private String timestamp() {
		String timestamp = null;
		Calendar cal = Calendar.getInstance();
		DateFormat dfm = new SimpleDateFormat(Constantes.FORMAT_TIMESTAMP);
		dfm.setTimeZone(TimeZone.getTimeZone(Constantes.GTM));
		timestamp = dfm.format(cal.getTime());
		return timestamp;
	}

	private String canonicalize(SortedMap<String, String> sortedParamMap) {
		if (sortedParamMap.isEmpty()) {
			return "";
		}
		StringBuffer buffer = new StringBuffer();
		Iterator<Map.Entry<String, String>> iter = sortedParamMap.entrySet().iterator();
		while (iter.hasNext()) {
			Map.Entry<String, String> kvpair = iter.next();
			buffer.append(percentEncodeRfc3986(kvpair.getKey()));
			buffer.append(Constantes.IGUAL);
			buffer.append(percentEncodeRfc3986(kvpair.getValue()));
			if (iter.hasNext()) {
				buffer.append(Constantes.Y_ENLACE);
			}
		}
		String canonical = buffer.toString();
		return canonical;
	}

	private String percentEncodeRfc3986(String s) {
		String out;
		try {
			out = URLEncoder.encode(s, Constantes.UTF8).replace(Constantes.SIM_MAS, Constantes.EQUI_SIM_MAS)
					.replace(Constantes.SIM_POR, Constantes.EQUI_SIM_POR)
					.replace(Constantes.EQUI_MENOS_OBLICUO, Constantes.MENOS_OBLICUO);
		} catch (UnsupportedEncodingException e) {
			out = s;
		}
		return out;
	}
}