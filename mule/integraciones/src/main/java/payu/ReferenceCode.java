package payu;

import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;

public class ReferenceCode implements Callable{

	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		String reference = System.currentTimeMillis()+"";
		return reference;
	}

}
