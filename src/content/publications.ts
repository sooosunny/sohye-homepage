export type PublicationStatus =
  | 'Published'
  | 'Forthcoming'
  | 'Conditionally Accepted'
  | 'Revise & Resubmit'
  | 'Under Review'
  | 'Working Paper'
  | 'In Progress'

export type Publication = {
  readonly authors: string
  readonly year?: string
  readonly title: string
  readonly venue: string
  readonly volumeIssuePages?: string
  readonly doi?: string
  readonly url?: string
  readonly status: PublicationStatus
  readonly manuscriptAvailable?: boolean
}

export const journalArticles: readonly Publication[] = [
  { authors: 'Bae, S., Song, H. G., & Sunny, H. W.', year: '2026', title: 'From viewing to buying: How viewer attitudes and para-social bonds drive short food content purchase intentions.', venue: 'Culinary Science & Hospitality Research', volumeIssuePages: '32(2)', status: 'Forthcoming' },
  { authors: 'Bae, S., & Park, G. G.', year: '2025', title: 'The Effects of Consumers’ Perceptions of ESG Management in Foodservice Franchises on Reuse Intention: An Ordered Probit Analysis.', venue: 'Culinary Science & Hospitality Research', volumeIssuePages: '31(12), 243–254', status: 'Published' },
  { authors: 'Bae, S., & Park, G.', year: '2025', title: 'An Ordered Probit Analysis of the Factors Influencing Relationships among Cultural Heritage Tourism Motivation, Constraints, and Attitudes.', venue: 'FoodService Industry Journal', volumeIssuePages: '21(6), 431–454', status: 'Published' },
  { authors: 'Bae, S., & Kim, I.', year: '2025', title: 'Comparative Analysis of Foreign Consumers’ Perceptions of K-Food Emotions: Focusing on Reddit Cases.', venue: 'The Journal of Internet Electronic Commerce Research', volumeIssuePages: '25(5), 121–131', status: 'Published' },
  { authors: 'Lee, S., Bae, S., & Kim, I.', year: '2025', title: 'Exploring formation process of willingness to accept online personalised advertising for travel products.', venue: 'The e-Business Studies', volumeIssuePages: '26(2), 109–125', status: 'Published' },
  { authors: 'Nam, J. H., Bae, S., & Kwon, E. K.', year: '2025', title: 'The impact of senior tourists’ package tour experiences on travel satisfaction, trust, and intention to pay premium.', venue: 'Journal of Tourism Enhancement', volumeIssuePages: '129–148', status: 'Published' },
  { authors: 'Yoon, H., Bae, S., & Park, E.', year: '2025', title: 'Effects of Experiential Economic Factors on Emotional Attachment and Pro-Environmental Behaviour Among Nature-based Walking Tourists.', venue: 'Journal of Tourism Enhancement', volumeIssuePages: '13(1), 91–111', status: 'Published' },
  { authors: 'Bae, S., & Kim, I.', year: '2024', title: 'Social Perception and Activation Strategies of Templestay: A Big Data Analysis.', venue: 'FoodService Industry Journal', volumeIssuePages: '20(6), 275–288', status: 'Published' },
  { authors: 'Kim, I., & Bae, S.', year: '2024', title: 'The Effects of Motivation for Open-Kitchen Restaurants Adopting Robot Chefs on Consumer Attitude, Intentions to Use, and Word-of-Mouth.', venue: 'FoodService Industry Journal', volumeIssuePages: '20(6), 383–397', status: 'Published' },
  { authors: 'Park, E., Bae, S., & Kim, I.', year: '2024', title: 'Exploring motivations influencing customers’ attitudes toward using reusable cups in eco-friendly coffee shops.', venue: 'Journal of Tourism Enhancement', volumeIssuePages: '167–184', status: 'Published' },
  { authors: 'Kim, Y., Bae, S., & Kim, I.', year: '2024', title: 'Effects of Robotic Chefs’ Food Quality Prediction and Personal Innovativeness on Consumer Attitudes and Intention to Visit.', venue: 'Journal of Tourism Enhancement', volumeIssuePages: '12(3), 27–42', status: 'Published' },
  { authors: 'Bae, S., Kim, J., Kim, D., & Kim, I.', year: '2024', title: 'Investigating benefits of operating shared kitchens for virtual restaurants: Small-business owner perspectives.', venue: 'Journal of Hospitality and Tourism Studies', volumeIssuePages: '26(4), 193–204', status: 'Published' },
  { authors: 'Kang, S., Han, S. H., Bae, S. H., & Yoon, Y. H.', year: '2024', title: 'The effect of serving robots on attitude and behavioural intention of restaurant customers.', venue: 'Korean Journal of Franchise Management', volumeIssuePages: '15(2), 57–75', status: 'Published' },
  { authors: 'Bae, S., & Kim, I.', year: '2024', title: 'Investigating barriers hindering attitude formation towards reusable cup usage in the coffee shop industry.', venue: 'FoodService Industry Journal', volumeIssuePages: '20(3), 119–131', status: 'Published' },
  { authors: 'Bae, S., & Kim, I.', year: '2024', title: 'Exploring the structure of motivations, benefits and values of walking travel experience sharing on social media.', venue: 'Journal of Hospitality and Tourism Studies', volumeIssuePages: '26(2), 65–79', status: 'Published' },
  { authors: 'Bae, S., Park, H., Kang, S., & Han, S.', year: '2023', title: 'How Usage Motivation Regarding Serving Robots Affect Customer Attitudes and Intent to Revisit Restaurants.', venue: 'FoodService Industry Journal', volumeIssuePages: '19(6), 281–295', status: 'Published' },
  { authors: 'Bae, S., & Kim, I.', year: '2022', title: 'Importance-satisfaction Analysis for Campsite Selection Attributes after the COVID-19 Outbreak.', venue: 'Korean Journal of Hospitality & Tourism', volumeIssuePages: '31(4), 127–145', status: 'Published' },
] as const

export const worksInProgress: readonly Publication[] = [
  { authors: 'Bae, S., Lee, H., Soeiro, J. D., Shin, H., Metzger, P., & Kim, M. J.', year: '2026', title: 'Immersive Recovery Through Space Tourism: An Experimental Study on Psychological and Physiological Responses.', venue: 'Tourism Management', status: 'In Progress' },
  { authors: 'Lee, H., Bae, S., Soeiro, J. D., Shin, H., Metzger, P., & Kim, M. J.', year: '2026', title: 'Does Microgravity-like VR Recalibrate Risk? Evidence from Underwater vs. Ground VR for Space Tourism.', venue: 'Annals of Tourism Research', status: 'In Progress' },
  { authors: 'Park, G., Bae, S., Lee, H., Soeiro, J. D., Metzger, P., & Kim, M. J.', year: '2026', title: 'Estimating Consumer Preferences for Space Tourism Experiences.', venue: 'Journal of Travel Research', status: 'In Progress' },
  { authors: 'Bae, S., Choi, H., Kim, N., Petrick, J. F., & Kim, M. J.', year: '2026', title: 'Space Flight Experience Interview.', venue: 'Annals of Tourism Research', status: 'In Progress' },
  { authors: 'Bae, S., Lim, W. M., Lee, H., Hong, M., & Kim, M. J.', year: '2026', title: 'Space tourism bibliometric analysis: Sustainability, ethics & corporate social responsibility.', venue: 'Annals of Tourism Research', status: 'In Progress' },
] as const

export const bookChapters: readonly Publication[] = []
