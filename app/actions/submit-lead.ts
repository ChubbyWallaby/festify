'use server';

import { Resend } from 'resend';
import { QuestionnaireState, calculateBudget } from '@/lib/pricing/engine';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitLeadAction(state: QuestionnaireState) {
  try {
    const breakdown = calculateBudget(state);
    
    // Check required fields
    if (!state.clientInfo?.name || !state.clientInfo?.email || !state.clientInfo?.phone) {
      return { success: false, error: 'Missing required client information.' };
    }

    const { name, email, phone } = state.clientInfo;

    const htmlContent = `
      <h2>New Lead Submission: ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <br />
      <h3>Event Details</h3>
      <ul>
        <li><strong>Location:</strong> ${state.location}</li>
        <li><strong>Tier:</strong> ${state.tier}</li>
        <li><strong>Guest Count:</strong> ${state.guestCount}</li>
        <li><strong>Venue:</strong> ${state.hasVenue ? 'Already have venue' : 'Needs venue'}</li>
        ${!state.hasVenue ? `<li><strong>Venue Setting:</strong> ${state.venueSetting}</li>` : ''}
        ${!state.hasVenue && state.needsTent !== null ? `<li><strong>Tent Needed:</strong> ${state.needsTent ? `Yes (${state.tentType})` : 'No'}</li>` : ''}
        <li><strong>Cocktail Furniture:</strong> ${state.cocktailFurniture ? 'Yes' : 'No'}</li>
        <li><strong>Dining Party Furniture:</strong> ${state.diningPartyFurniture ? 'Yes' : 'No'}</li>
        <li><strong>Flowers:</strong> ${state.needsFlowers ? `Yes (${state.flowerTypes.join(', ')})` : 'No'}</li>
        <li><strong>Catering:</strong> ${state.needsCatering ? 'Yes' : 'No'}</li>
        <li><strong>Lighting:</strong> ${state.needsLighting ? 'Yes' : 'No'}</li>
        <li><strong>Other Services:</strong> ${state.otherServices.length > 0 ? state.otherServices.join(', ') : 'None'}</li>
      </ul>
      <br />
      <h3>Estimated Budget Breakdown</h3>
      <ul>
        <li><strong>Venue:</strong> €${breakdown.venue.toLocaleString()}</li>
        <li><strong>Tent:</strong> €${breakdown.tent.toLocaleString()}</li>
        <li><strong>Furniture:</strong> €${breakdown.furniture.toLocaleString()}</li>
        <li><strong>Flowers:</strong> €${breakdown.flowers.toLocaleString()}</li>
        <li><strong>Lighting:</strong> €${breakdown.lighting.toLocaleString()}</li>
        <li><strong>Catering:</strong> €${breakdown.catering.toLocaleString()}</li>
        <li><strong>Other Services:</strong> €${breakdown.services.toLocaleString()}</li>
      </ul>
      <hr />
      <h3><strong>Grand Total: €${breakdown.total.toLocaleString()}</strong></h3>
    `;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'brunomvaraujo1997@gmail.com',
      subject: `New Wedding Quote Request from ${name}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Failed to submit lead:', err);
    return { success: false, error: err.message || 'Unknown error occurred.' };
  }
}
