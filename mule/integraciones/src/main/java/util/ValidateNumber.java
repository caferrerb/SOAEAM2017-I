package util;

import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;

public class ValidateNumber implements Callable {

	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		try {
			Object object = eventContext.getMessage().getPayload();
			if (object == null) {
				return "1";
			} else {
				String value = (String) object;
				try {
					long page = Integer.parseInt(value);
					if (page <= 0) {
						return "1";
					}
					return page + "";
				} catch (Exception e) {
					return "1";
				}
			}
		} catch (Exception e) {
			return "1";
		}
	}

}
